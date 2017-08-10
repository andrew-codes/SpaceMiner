const v1Url = 'http://localhost/VersionOne.Web';
const v1QueryUrl= `${v1Url}/query.v1`;
const v1AssetUrl = `${v1Url}/api/asset`;

const getAuth = name => btoa(`${name}`);

const makeBeforeSend = auth => x => x.setRequestHeader('Authorization', 'Basic ' + auth);

class V1Client {
	constructor(authString=null, user=null) {
		if (user === null) user = Meteor.user();
		this.user = user;
		if (authString === null) authString = `${user.profile.nickName}:${user.profile.nickName}`;
		this.auth = getAuth(authString);
	}

	get userName() {
		return this.user.profile.nickName;
	}

	query(options) {
		options.beforeSend = makeBeforeSend(this.auth);
		return HTTP.postPromise(v1QueryUrl, options);
	}

	assetsPost(options) {
		options.beforeSend = makeBeforeSend(this.auth);
		return HTTP.postPromise(v1AssetUrl, options);
	}
}

this.V1Client = V1Client;