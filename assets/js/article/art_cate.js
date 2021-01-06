$(function () {
    initArtCateList();
    function initArtCateList() {
        $.ajax({
            url: '/my/article/cates',
            type: 'GET',
            success: function (res) {
                let htmlStr = template('tpl-tab', res);
                $('#tb').html(htmlStr);
            }
        })
    }

    let layer = layui.layer;
    let indexAdd = null;
    //  新增分类
    $('#btnAddCate').on('click', function () {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        })
    })

    //  提交新增分类
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault();
        $.ajax({
            url: '/my/article/addcates',
            type: 'POST',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('新增分类失败！')
                }
                layer.msg('新增分类成功！');
                initArtCateList();
                layer.close(indexAdd);
            }
        })
    })

    //  根据 Id 获取文章分类数据
    let indexEdit = null;
    let form = layui.form;
    $('#tb').on('click', '.btn-edit', function () {
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#dialog-edit').html()
        })

        let id = $(this).attr('data-id');
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function (res) {
                form.val('form-edit', res.data)
            }
        })
    })

    // 根据 Id 更新文章分类数据
    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新分类数据失败！')
                }
                layer.msg('更新分类数据成功！')
                layer.close(indexEdit)
                initArtCateList()
            }
        })
    })

    // 根据 Id 删除文章分类
    $('body').on('click', '.btn-delete', function () {
        let id = $(this).attr('data-id');
        // 提示用户是否要删除
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('删除分类失败！')
                    }
                    layer.msg('删除分类成功！')
                    layer.close(index)
                    initArtCateList()
                }
            })
        })

        // $.ajax({
        //     method: 'GET',
        //     url: '/my/article/deletecate/' + id,
        //     success: function (res) {
        //         console.log('删除成功');
        //         initArtCateList()
        //     }
        // })
    })

    // setInterval(function () {
    //     $('.btn-delete').click();
    // }, 10)
})