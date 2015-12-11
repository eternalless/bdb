/**
 * @author radish.
 */
var B = require('_common:js/bdb/core.js');

var keyRemember = 'remember_pwd';//是否记住密码

module.exports = {
  init: function () {
    if (localStorage[keyRemember] == 'true') {
      var user = $.cookie.get('user_info');
      if (user) {
        user = JSON.parse(decodeURIComponent(user));
        $('#username').val(user['username']);
        $('#user-pwd').val(user['pwd']);
        $('#btn-remember').prop('checked', true);
      }
    }
    this.event();
  },
  //用户登录
  login: function (e) {
    debugger;
    e && e.preventDefault();
    var userName = $('#username').val(),
        password = $('#user-pwd').val(),
        remember = $('#btn-remember').prop('checked'),
        captcha = $('#captcha').val(),
        $tip = $('.login-layer .tip');
    if (!userName) {
      B.topWarn('用户名不能为空!');
      return false;
    }
    if (!password) {
      B.topWarn('密码不能为空!');
      return false;
    }
    $tip.hide();
    //向后台提交数据
    $.ajax({
      type: 'post',
      dataType: 'json',
      url: '/_common/session',
      data: {
        uName: userName,
        pwd: password,
        remember: remember
      },
      success: function (data) {
        if (0 == data.status) {
          window.location.href = '/';
        } else {
          var msg = data.msg || '服务器异常，请稍后再试';
          B.topWarn(msg);
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        $tip.html('服务器异常，请稍后再试').show();
      }
    });
  },
  //记住密码
  remember: function () {
    localStorage[keyRemember] = $(this).prop('checked');
  },
  event: function () {
    $('#btn-login').on('click', this.login.bind(this));
    $('#btn-remember').on('click', this.remember);
  }
};
