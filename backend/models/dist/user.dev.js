"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var TweetService = require("../services/tweet-service");

var LikeService = require("../services/like-service"); // const UserService = require("../services/user-service")


var TweetModel = require("./tweet");

var like = require("./like");

module.exports =
/*#__PURE__*/
function () {
  function user() {
    var username = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var userLikes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var tweets = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    var followers = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
    var followings = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [];
    var id = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : this.createID();

    _classCallCheck(this, user);

    this.username = username;
    this.id = id;
    this.userLikes = userLikes;
    this.tweets = tweets;
    this.followers = followers;
    this.followings = followings;
  }

  _createClass(user, [{
    key: "follow",
    value: function follow(userID) {
      var _this = this;

      var theFollowing, followingIndex;
      return regeneratorRuntime.async(function follow$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(userService.findItem(userID));

            case 2:
              theFollowing = _context.sent;
              followingIndex = this.followings.findIndex(function (p) {
                return p.id == _this.id;
              });

              if (!(followingIndex < 0)) {
                _context.next = 9;
                break;
              }

              this.followings.push(theFollowing.username);
              theFollowing.followers.push(this.username);
              _context.next = 10;
              break;

            case 9:
              return _context.abrupt("return", null);

            case 10:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "createTweet",
    value: function createTweet() {
      var text,
          newTweet,
          _args2 = arguments;
      return regeneratorRuntime.async(function createTweet$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              text = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : "";
              newTweet = new TweetModel(text, this, TweetService.createID());
              console.log(newTweet);
              this.tweets.push(newTweet);
              _context2.next = 6;
              return regeneratorRuntime.awrap(TweetService.add(newTweet));

            case 6:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "createID",
    value: function createID() {
      var id = TweetService.createID();
      return id;
    }
  }, {
    key: "likeTweet",
    value: function likeTweet(tweetID) {
      var theTweet, tweetAuthor, newLike;
      return regeneratorRuntime.async(function likeTweet$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              console.log(tweetID);
              _context3.next = 3;
              return regeneratorRuntime.awrap(TweetService.findItem(tweetID));

            case 3:
              theTweet = _context3.sent;
              tweetAuthor = theTweet.user; // Error handling

              if (!(theTweet == undefined)) {
                _context3.next = 7;
                break;
              }

              return _context3.abrupt("return", console.log("Undefined tweet. Check tweet id."));

            case 7:
              _context3.next = 9;
              return regeneratorRuntime.awrap(LikeService.findIndexByUserID(this.id));

            case 9:
              if (!_context3.sent) {
                _context3.next = 11;
                break;
              }

              return _context3.abrupt("return", console.log("You've already liked this tweet"));

            case 11:
              _context3.t0 = regeneratorRuntime;
              _context3.t1 = like;
              _context3.t2 = this;
              _context3.t3 = theTweet;
              _context3.next = 17;
              return regeneratorRuntime.awrap(LikeService.basicID());

            case 17:
              _context3.t4 = _context3.sent;
              _context3.t5 = new _context3.t1(_context3.t2, _context3.t3, _context3.t4);
              _context3.next = 21;
              return _context3.t0.awrap.call(_context3.t0, _context3.t5);

            case 21:
              newLike = _context3.sent;
              _context3.next = 24;
              return regeneratorRuntime.awrap(theTweet.likes.push(this));

            case 24:
              tweetAuthor.userLikes.push(newLike); // Update databases

              _context3.next = 27;
              return regeneratorRuntime.awrap(TweetService.updateService(tweetID, theTweet));

            case 27:
              _context3.next = 29;
              return regeneratorRuntime.awrap(LikeService.updateService(this.id, newLike));

            case 29:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "dislikeTweet",
    value: function dislikeTweet(tweetID) {
      var _this2 = this;

      var dislikedTweet, dislikedTweetIndex;
      return regeneratorRuntime.async(function dislikeTweet$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return regeneratorRuntime.awrap(LikeService.findIndexByUserID(this.id));

            case 2:
              _context4.t0 = _context4.sent;

              if (!(_context4.t0 >= 0)) {
                _context4.next = 23;
                break;
              }

              _context4.next = 6;
              return regeneratorRuntime.awrap(TweetService.findItem(tweetID));

            case 6:
              dislikedTweet = _context4.sent;
              dislikedTweetIndex = dislikedTweet.likes.findIndex(function (p) {
                return p.id === _this2.id;
              });
              _context4.next = 10;
              return regeneratorRuntime.awrap(dislikedTweet.likes.splice(dislikedTweetIndex, 1));

            case 10:
              _context4.t1 = regeneratorRuntime;
              _context4.t2 = LikeService;
              _context4.t3 = tweetID;
              _context4.next = 15;
              return regeneratorRuntime.awrap(LikeService.findIndexByUserID(this.id));

            case 15:
              _context4.t4 = _context4.sent;
              _context4.t5 = _context4.t2.newDel.call(_context4.t2, _context4.t3, _context4.t4);
              _context4.next = 19;
              return _context4.t1.awrap.call(_context4.t1, _context4.t5);

            case 19:
              _context4.next = 21;
              return regeneratorRuntime.awrap(TweetService.updateService(tweetID, dislikedTweet));

            case 21:
              _context4.next = 24;
              break;

            case 23:
              return _context4.abrupt("return", null);

            case 24:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this);
    }
  }], [{
    key: "create",
    value: function create(_ref) {
      var username = _ref.username,
          userLikes = _ref.userLikes,
          tweets = _ref.tweets,
          followers = _ref.followers,
          followings = _ref.followings,
          id = _ref.id;
      return new user(username, userLikes, tweets, followers, followings, id);
    }
  }]);

  return user;
}();