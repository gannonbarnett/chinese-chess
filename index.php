<?php

	if (session_status() != PHP_SESSION_ACTIVE) {
  		session_start();
	}
	$_SESSION['last_activity'] = time(); // update last activity time stamp
	
	include_once("api.php");

	if (isset($_POST["username"]) && isset($_POST["password"])){
		if (strcmp($_POST["password"], "guanyushiyiweidiannaokexuejia") == 0) {
			$_SESSION["username"] = $_POST["username"]; 
			header("Location: home/newGame.php"); 
		}else {
			header("Location: home/newGame.php");
		}
	}

?>

<!DOCTYPE HTML> 

<html>
<head>
    <meta charset="utf-8" />
    <title>Chinese Chess</title>
    <link href="css/index.css" rel="stylesheet">
 </head>
 <body class="body-class"> 

	<body> 
		<div class="topBar"> 
			<span> Gannon Barnett July 2018. </span>
		</div>

		<div class="loginDiv"> 
			<h> WELCOME TO CHINESE CHESS</p> 
				
			<p> Create an account below, or login to view current games. </p> 
			<form id="create_form" action="index.php" method="post">
				<p class="inputElement"><input placeholder="Username" class="inputBox" type="text" id='username' name="username" type="text" value=""> </p>
				<p class="inputElement"> <input placeholder="Password" class="inputBox" type="text" id='password' name="password" type="text" value=""> </p>
			
				<input type="submit" name="submit" value="Submit me!" />
			</form> 
		</div>

		<div> 
	</body> 
	
	<script> 

		function makeNewUser() {
		
			const username = document.getElementById('userinput').value.trim(); 
			const password = document.getElementById('passwordinput').value.trim(); 

			document.location.assign('home/newGame.php');

		}

	</script> 

</html>
