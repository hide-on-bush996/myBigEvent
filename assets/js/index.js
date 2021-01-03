$(function () {

    getUserInfo();

    let layer = layui.layer;
    $('#btnLogout').on('click', function () {
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
            //do something
            localStorage.removeItem('token');
            location.href = '/login.html';
            layer.close(index);
        });
    })
})

//  获取用户信息
function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        type: 'GET',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！');
            }
            renderAvatar(res.data)
        }
      
    })
}

//  渲染用户头像
function renderAvatar(user) {
    let uname = user.nickname || user.username;
    $('#welcome').html('欢迎&nbsp;&nbsp;' + uname);
    if (user.user_pic !== null) {
        $('.text-avatar').hide();
        $('.layui-nav-img').attr('src', user.user_pic).show();
    } else {
        let first = uname[0].toUpperCase();
        $('.layui-nav-img').hide();
        $('.text-avatar').html(first).show();
    }
}