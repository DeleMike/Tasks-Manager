/**
 * Tries to collect user details to reset password
 *
 */
const resetPasswordClient = async (req, res) => {
   res.send(`
   <!DOCTYPE html>
<html lang="en">

<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Reset your Password</title>
<style>
   body {
      background-color: rgb(238, 229, 229);
      height: 100%;
   }

   #info {
      position: absolute;
      left: 50%;
      top: 50%;
      -webkit-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
   }
</style>
</head>

<body>
<div id="info">
   <input type="text" id="email" name="email"/>
   <button id="post-btn" title="Reset Password" type="submit">Reset Password</button>

   <h2 id="result"></h2>
</div>

</body>
<script>
button = document.getElementById('post-btn')

h2 = document.getElementById('result')
button.addEventListener('click', async _ => {
   email_field = document.getElementById('email').value
   let urlString = window.location.href;
   let paramString = urlString.split('?')[1];
   let params_arr = paramString.split('&');

   let data = {
      token: '',
      email: '',
      password: ''
   }

   for (let i = 0; i < params_arr.length; i++) {
      let pair = params_arr[i].split('=');

      if (pair[0] == 'token') {
         data['token'] = pair[1]
      } else if (pair[0] == 'email') {
         data['email'] = pair[1]
      }
   }
  
   data['password'] = email_field
    console.log('Data gotten  = : ', data);

   try {
      fetch("/api/auth/reset-password", {
         method: "POST",
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(data)
      }).then(res => {
         if (res.status == 401) {
            h2.textContent = "Cannot reset password";
         } else {
            h2.textContent = "Try logging into your account";
         }
          console.log("Request complete! response:", res.json());
      });
   } catch (error) {
      console.log(error);
   }

});
</script>

</html>
   `)
}

module.exports = {
   resetPasswordClient
}