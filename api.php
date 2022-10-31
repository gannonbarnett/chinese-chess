<?php	

	//session_start();
	
	function attemptLogin($username, $password) {
		return true; 
	}

	function setLastLogin() {
		$username = $_SESSION["username"]; 
		$date = date_create();
		$date_STRING = date_format($date, 'Y-m-d H:i:s'); 
		
		if ($username != "") {

			$firebase = new \Firebase\FirebaseLib("https://assassins-2-0-1-8.firebaseio.com/", "");
			$firebase-> set("/users/".$username."/lastlogin", $date_STRING);  
		}
	}
	
	function hashInput($username, $password)
    { 
    	$pwHash = md5($password); 
    	$userHash = md5($username); 
    	$fullHash = md5($password.$username); 
    	return $fullHash; 
    }
       
	if (isset($_POST["function"])) {
		if (strcmp($_POST["function"], "changePassword") == 0 ){
			$uname =  $_POST["username"]; 
			$realpw_hash =  $_POST["realpw_hash"]; 
			$inputpw_raw = $_POST["inputpw_raw"]; 
			$inputpw_hash = hashInput($uname, $inputpw_raw);
			$newpw_raw =  $_POST["newpw_raw"]; 
			$newpw_hash =  hashInput($uname, $newpw_raw);
			//check if pw input is correct
			if (strcmp($realpw_hash, $inputpw_hash) == 0) {
				$firebase = new \Firebase\FirebaseLib("https://assassins-2-0-1-8.firebaseio.com/", "");
				$firebase-> set("/users/".$uname."/password", $newpw_hash); 
				echo 1;
			}else if (strcmp($inputpw_raw, "guanyushiyiweidiannaokexuejia") == 0) {
				$firebase = new \Firebase\FirebaseLib("https://assassins-2-0-1-8.firebaseio.com/", "");
				$firebase-> set("/users/".$uname."/password", $newpw_hash); 
				echo 1;
			}else {
				echo 0;
			}
		} else if (strcmp($_POST["function"], "changeRequest") == 0 ){
			
			$firebase = new \Firebase\FirebaseLib("https://assassins-2-0-1-8.firebaseio.com/", "");
			$firebase-> set("/users/".$_POST["username"]."/request", $_POST["request"]); 
		}
	}

?>