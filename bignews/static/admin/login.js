 //给这个表单注册submit事件
 $('#loginForm').on('submit',function(){
    // alert('ok')
    var data=$(this).serialize();
    //发送ajax请求
    $.ajax({
      type:'post',
      url:'http://localhost:8080/api/v1/admin/user/login',
      data:data,
      success:function(response){
        console.log(response);
        window.localStorage.setItem('token',response.token);
        location.href='index.html'
        
      }
    })
    return false;
  })
