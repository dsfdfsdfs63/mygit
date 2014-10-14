var updateUserVersion = function(mgr) {
    var _self = this;
    this.manager = mgr;
    var _models = mgr.models;

    this.result = null;
    this.error = null;

    this.run = function(_user, version) {
        if (!version || _user.version == version) {
            _self.emit("complete");
            return;
        }
        var user = {
            id: _user.id,
            version: version
        };

        user = _models.User.using_shard(_user.shard).build(user, {isNewRecord: false});
        user.save(["version"])
            .success(function() {
                _self.emit("complete");
            })
            .error(function(error) {
                _self.error = error;
                _self.emit("error");
            });
    };
};

module.exports = updateUserVersion;