/**
 * Displays verification page
 *
 */
const verifyUserClient = async (req, res) => {
   res.send(
      `
      <!DOCTYPE html>
<html lang="en">

<head>
   <meta charset="UTF-8">
   <meta http-equiv="X-UA-Compatible" content="IE=edge">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title>Verify your email</title>
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
      <button id="post-btn" title="Verify Email" type="submit">Verify Email</button>

      <h2 id="result"></h2>
   </div>

</body>
<script>
   button = document.getElementById('post-btn')
   h2 = document.getElementById('result')
   button.addEventListener('click', async _ => {
      let urlString = window.location.href;
      let paramString = urlString.split('?')[1];
      let params_arr = paramString.split('&');

      let data = {
         verificationToken: '',
         email: ''
      }

      for (let i = 0; i < params_arr.length; i++) {
         let pair = params_arr[i].split('=');
         // console.log("Key is:", pair[0]);
         // console.log("Value is:", pair[1]);

         if (pair[0] == 'verificationToken') {
            data['verificationToken'] = pair[1]
         } else if (pair[0] == 'email') {
            data['email'] = pair[1]
         }

         // console.log('Data gotten  = : ', data);
      }
      try {
         fetch("/api/auth/verify-email", {
            method: "POST",
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
         }).then(res => {
            if (res.status == 401) {
               h2.textContent = "Email is already verified";
            } else {
               h2.textContent = "Email is verified";
            }
            // console.log("Request complete! response:", res.json());
         });
      } catch (error) {
         console.log(error);
      }

   });
</script>

</html>
      `
   )
}

module.exports = {
   verifyUserClient
}