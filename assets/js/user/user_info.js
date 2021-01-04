$(function () {

    let form = layui.form;
    let layer = layui.layer;
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return layer.msg('昵称长度必须在 1 ~ 6 个字符之间！');
            }
        }
    })

    // 初始化用户的基本信息
    function initUserInfo() {
        $.ajax({
            url: '/my/userinfo',
            type: 'GET',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败！');
                }
                form.val('formUserInfo', res.data);
            }
        })
    }
    initUserInfo();

    //  重置表单
    $('#btnReset').on('click', function (e) {
        e.preventDefault();
        initUserInfo();
    })

    //  提交表单
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            url: '/my/userinfo',
            type: 'POST',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败！');
                }
                layer.msg('更新用户信息成功！');
                window.parent.getUserInfo();
            }
        })
    })

})