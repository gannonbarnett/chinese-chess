<?php

?>

<!DOCTYPE HTML> 

<html>
<head>
    <meta charset="utf-8" />
    <title>Chinese Chess</title>
    <link href="home.css" rel="stylesheet">
 </head>
 <body class="body-class"> 

	<div class="titleDiv"> 
 		<p style="text-align:center">C H I N E S E . . . C H E S S</p>
	</div>

	<div class="menuBar"> 
		<div class="menuElement" onclick="document.location.assign('newGame.php');"> New Game </div>
		<div class="menuElement activeMenu" onclick="document.location.assign('currentGames.php');"> Current Games </div>
		<div class="menuElement" onclick="document.location.assign('pastGames.php');"> Past Games </div>
		<div class="menuElement" onclick="document.location.assign('friends.php');"> Friends </div>
		<div class="menuElement" onclick="document.location.assign('account.php');""> Your Account </div>
	</div>

	<div>
		List of current games
	</div>
</body>
</html>
