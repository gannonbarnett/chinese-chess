<?php
	session_start();
	
	//if (!isset($_SESSION["username"])) {
	// 	header("Location: index.php");
	// }

	if (isset($_GET["logout"])){
		if (session_status() == PHP_SESSION_ACTIVE) {
  			session_destroy();
		}
		header("Location: index.php");
		die();
	}
	
	// $hostname = "localhost";
	// $username = "gannonbarnett";
	// $password = "gannon";

	// // Create connection
	// //$conn = new mysqli($hostname, $username, $password);

	// //$db = new PDO('dblib:host=localhost:3306;dbname=ChineseChessDatabase;charset=UTF-8', $username, $password);

	// // Check connection
	// if ($conn->connect_error) {
	//     die("Connection failed: " . $conn->connect_error);
	// } 
?>

<html>
<head>
    <meta charset="utf-8" />
    <title>Chinese Chess</title>
 	<link rel="stylesheet" type="text/css" href="css/game.css">
 </head>	
 <body> 
 		<div class="titleDiv"> 
	 		<p style="text-align:center">C H I N E S E . . . C H E S S</p>
		</div>

		<div class="sideBar" id="sideBarDiv"> 
			<div class="sideBarElement"> 
				<p> Gannon Barnett</p>
				<button class="sideBarButton" id="LogOutButton" onclick='window.location.assign("home/newGame.php")'> Home </button>
				<br>
			</div>
			<div class="sideBarElement"> 
				<div class="controlBox"> 
					<button class="sideBarButton" id="controlBox_newgame"> New Game </button>
					<br>
					<button class="sideBarButton" id="controlBox_replaygame"> Replay Game </button>
					<br>
					<button class="sideBarButton" id="controlBox_replaymove"> Replay Last Move </button>
					<br>
					<button class="sideBarButton" id="controlBox_undomove"> Undo Last Move </button>
					<br>
				</div>

			</div>
			<div class="sideBarElement"> 
				<span> 1 min 5 seconds </span>
				<br>
				<button class="sideBarButton"> Pause </button>
			</div>
			<div class="sideBarElement"> 
				<button class="sideBarButton" onclick='document.getElementById("slideScreenID").classList.add("animateSlide")'> See Rules </button>
			</div>
		</div>

		<div class="mainScreen" id="mainScreenDiv"> 
	 		<div class="gameScreen">  
	 			<div class="gameBoard"> 
	 				<canvas style="width: 400px; margin: auto;" id="myCanvas"> </canvas>
	 			</div>
	 		</div>
	 		<div class="infoDiv"> 
	 			<p id="logBoard" style="text-align:center"> Test </p>
	 		</div>
	 		 <div id="slideScreenID" class="slideScreen" style="text-align: center;">
				<div class="titleText"> RULE BOOK <button class="sideBarButton" id="closeRules" onclick="closeRules()"> Close Rules </button> </div>
			</div> 
		</div>

	</body> 
	<script> 
		var sideBar = document.getElementById("sideBarDiv"); 
		sideBar.style.height = document.body.clientHeight; 


		function closeRules() {
			let slideScreen = document.getElementById('slideScreenID'); 
			slideScreen.classList.remove('animateSlide'); 
			slideScreen.classList.add('animateSlideOut'); 
		}
	</script>
	<script type="text/javascript" src="js/java.js"></script>
</html>



