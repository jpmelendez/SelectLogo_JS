<?php
if(isset($_GET['success'])){
?>
  <div id="structure">
    <h3>Thank you</h3>
    <p>Your logo library selections have been submitted, a member of the Show & Tell team will contact you.</p>
  </div>
<?php
} else {

if (!class_exists('validate')){
  require('includes/classes/class.validation.php');
}

$errors = array();

$name = '';
$email = '';
$logos = array();

if (isset($_POST['nospam'])){

  $name = (isset($_POST['name'])) ? htmlspecialchars($_POST['name'], ENT_QUOTES) : '';
  $email = (isset($_POST['email'])) ? htmlspecialchars($_POST['email'], ENT_QUOTES) : '';
  
  $logos = $_POST['logos'];
  
  if (count($errors) <= 0){
  
    require(_DIR.'includes/mail/swift_required.php');
    $transport = Swift_MailTransport::newInstance();
    $mailer = Swift_Mailer::newInstance($transport);
    
    /* MESSAGE FOR NETWORK */
    $mail_subject = 'Show & Tell Creative - Selected logo library images';
    $message = Swift_Message::newInstance($mail_subject);
    $message->setFrom(array('studio@showandtell.com.au' => 'Show & Tell Creative'));
    $message->setTo(array(
      'studio@showandtell.com.au' => 'Show & Tell Creative',
      $email => $name
    ));
    

    foreach($logos as $keys => $file){
      $files = explode('.', $file); 
      $message->attach(Swift_Attachment::fromPath(seo::$baseURL.'images_hr/'.$files[0].'.jpg'));
    }

    
    $body  = <<<EOD
<html>
<head>
	<title>$mail_subject</title>
	<style type="text/css">
	 ul {
	   list-style-type: square;
	 }
	</style>
</head>
<body style="font-family: Arial, Helvetica, sans-serif; font-size: 10pt; color: #000; margin: 10px;">
  <h2>Contact Details</h2>
  <p>
    <strong>Name:</strong> $name <br />
    <strong>Email address:</strong> $email <br />  
  </p>
</body>
</html>
EOD;
      
      $message->setBody($body, 'text/html');
      if (!$mailer->send($message)){
        $errors['mail'] = 'There was an error sending the mail. Please try again.';
      }
    	
    	if (count($errors <= 0)){
      	header('Location: '.seo::$basePATH.'?success');
      	exit();
    	}
  
  }
  

}


$images = array();
$image_file = file_get_contents(_DIR.'_request/images.txt');
$images = unserialize($image_file);

?>
  <div id="structure">
    <h1>Choose a logo!</h1>
    <form method="post" enctype="multipart/form-data" action="<?php echo seo::$basePATH; ?>" id="cform" data-validate="true" novalidate="novalidate">
      <input type="hidden" name="posted" value="1">
      <ul class="clearfix">
        <?php
          $c = count($images);
          $j = 0;
          foreach($images as $key => $img) {
          $size = getimagesize('images/'.$img);
          $w = $size[0];
          $h = $size[1];
         ?>
        <li><label for="<?php echo $j+1; ?>"><img src="images/<?php echo $img; ?>" /></label><span class="checkbox"><input type="checkbox" id="<?php echo $j+1; ?>" name="logos[]" class="check" value="<?php echo $img; ?>" /> <label for="<?php echo $j+1; ?>"><?php echo $j+1; ?></label></span></li>
        <?php
         $j++;
        }
        ?>
      </ul>
      <div id="submitholder-bg">  
        <div id="submitholder">
          <div class="field">
          <label for="name">Name</label>
          <input type="text" id="name" name="name" value="" data-validators="required" />
          </div>
          <div class="field">
          <label for="email">Email address</label>
          <input type="email" id="email" name="email" value="" data-validators="required validate-email"  />
          </div>
          <p style="margin-bottom: 10px; margin-top: 0; color: #fff;">Number of selected logos: <strong id="selected">0</strong></p>
          <button type="submit">Submit</button>
    
        </div>
      </div>
    </form>
  </div>
<?php
  }
?>