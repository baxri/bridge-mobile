# Running Detox (end-to-end testing)

### Requirements
node: >= 7.6.0


### Setup
```
brew update
brew tap wix/brew
brew install applesimutils
npm install
```

### Running
```
# in intro-backend repo:
rake test_server:start

# in intro-app repo:
npm test
```

### Detox Documentation
[https://github.com/wix/detox/tree/master/docs#detox-documentation](https://github.com/wix/detox/tree/master/docs#detox-documentation)
