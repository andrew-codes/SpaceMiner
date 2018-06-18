# Troubleshooting Guide

## Running dev docker stack throws an error
The most common reason is that node_modules directories were deleted locally after the initial building of the dev docker stack. This can be remedied by either rebuilding the dev stack via `docker run -rm docker/build.Dockerfile` or, if you have yarn installed locally, running `yarn && yarn bootstrap`.
