const v1Url = 'http://localhost/VersionOne.Web';
const v1QueryUrl= `${v1Url}/query.v1`;
const v1AssetUrl = `${v1Url}/api/asset`;

const getAuth = name => btoa(`${name}`);

const makeBeforeSend = auth => x => x.setRequestHeader('Authorization', 'Basic ' + auth);

class V1Client {
	constructor(user, authString=null) {
		this.user = user;
		if (authString === null) authString = `${user.profile.nickName}:${user.profile.nickName}`;
		this.auth = getAuth(authString);
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