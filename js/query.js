jQuery.noConflict();
function getlogoindex() {
    var elements = document.getElementById("logosSelection").querySelectorAll(".folio");
    var leng = parseInt(elements.length);
    if(leng === null){
      var indexlogo = parseInt("0");
    }else {
      var indexlogo = leng;
    }

    return indexlogo;
}
jQuery(document).ready(function() {
    jQuery('.owl-carousel').owlCarousel({
        loop:true,
        margin:10,
        responsiveClass:true,
        dots: false,
        nav:true,
        navText: ['<span>Prev</span>','<span>Next</span>'],
        autoWidth: false,
        responsive:{
            0:{
                items:1,
                nav:true,
                slideBy:1
            },
            600:{
                items:2,
                nav:true,
                slideBy:3
            },
            1000:{
                items:4,
                nav:true,
                slideBy:6
            }
        }
    })
  jQuery(document).on('click', '.link', function(event){
  //jQuery('.link').on('click', function(event){
    event.preventDefault();
    var $this = $(this);
    var imageattId = jQuery(this).attr("id");
    var img = jQuery(this).find("img");// select images inside .item
        len = img.length; // check if they exist
    if( len > 0 ){
        // images found, get id
        var attrID = img.first().attr("src"); // get id of first image
        var htmlContent = '<div id="popup">' +
        '<h3><span>Select Logo</span></h3>' +
        '<fieldset class="row fluid"> ' +
        '<div class="m4 md4 lg12 lg1-center"> ' +
        '<div id="img-content"> ' +
        '<img src="' +  attrID + '">' +
        '<input type="hidden" id="imgselection" value="' +  attrID + '" />' +
        '<input type="hidden" id="imgatr" value="' +  imageattId + '" />' +
        '</div> ' +
        '</div>' +
        '      <legend>Specific Requirements</legend> ' +
        '      <h4>Specific Requirements</h4> ' +
        '      <div class="sm4 md4 lg10 lg1-offset"> ' +
        '          <div class="field"> ' +
        '            <textarea name="requirements" id="requirements" placeholder="Outline specific requirements relating to your logo" data-validators="required"></textarea> ' +
        '          </div> ' +
        '      </div>' +
        '<div class="row fluid"> ' +
        '      <div class="sm4 md4 md2-offset"> ' +
        '          <button class="red" type="submit" id="add-button"> Add selection </button> ' +
        '      </div>' +
        '</div>'
        '</fieldset>' +
        '</div>';
        jQuery.magnificPopup.open({
          //fixedContentPos: ((platform.platform == 'ios') || (platform.platform == 'android')) ? true : 'auto',
          items: {
            src: htmlContent
          },
          type: 'inline'
          });
    } else {
      alert("No IMG found: ")
    }
  });


});

jQuery(document).on('click', '#add-button', function(){
      //var instance = jQuery('popup').retrieve('instance');
      var imgatt = jQuery('#imgselection').val();
      var reqatt = jQuery('#requirements').val();
      var imgBind = jQuery('#imgatr').val();
      var $imgslctr = "#" + imgBind;
      var indexVal = getlogoindex();
      var newdiv = '<div class="folio item-small logoitem" id="logo-item-' + indexVal + '" style="margin: 5px;">' +
      '  <figure><a class="linkpopup" id="' +  imgatt + '"><img src="' +  imgatt + '" width="154" height="154" alt="" /></a>' +
      '    <figcaption>' +
      '      <div class="wraper">' +
      '      <div class="delete-logo"> ' +
      '       <input class="deletetarget" id="del-' + indexVal + '" type="hidden" value="logo-item-' + indexVal + '" />' +
      '       <input class="imgbound" id="imgbound-' + indexVal + '" type="hidden" value="' + imgBind + '" />' +
      '      <button id="deletelogo" type="button">&#x2715;</button></div>' +
      '      <div class="edit-logo"><strong>Click to edit</strong>' +
      '       <input class="reqcontent" id="req-' + indexVal + '" type="hidden" name="logos[' + imgatt +']" value="'+ reqatt +'" />'+
      '       <input class="imgcontent" id="img-' + indexVal + '" type="hidden" value="' + imgatt +'" /></div>'+
      '      </div>' +
      '    </figcaption>' +
      '  </figure>' +
      '</div>';
      jQuery("#logosSelection").append( newdiv );
     if(jQuery('#emptypool').is(':visible'))
      {
        jQuery('#emptypool').hide();
      }
        if(jQuery( $imgslctr ).hasClass('link')){
            jQuery( $imgslctr ).removeClass( "link" );
        }
      jQuery('#popup').magnificPopup('close');
    });


    jQuery(document).on('click', '.edit-logo', function(event){
        event.preventDefault();
      var $this = $(this);
      var img = jQuery(this).find('input.imgcontent:not("button")');
          len = img.length; // check if they exist
      var req = jQuery(this).find('input.reqcontent:not("button")');
      if( len > 0 ){
          // images found, get id
          var imgSrc = img.first().val(); // get id of first image
          var imgAtrrID = img.first().attr("id");
          var reqVal = req.first().val();
          var reqAttrID = req.first().attr("id");
          var htmlContent = '<div id="popup">' +
          '<h3><span>Select Logo</span></h3>' +
          '<fieldset class="row fluid"> ' +
          '<div class="m4 md4 lg12 lg1-center"> ' +
          '<div id="img-content"> ' +
          '<img src="' +  imgSrc + '">' +
          '<input type="hidden" id="imgselection" value="' +  imgSrc + '" />' +
          '<input type="hidden" id="imgID" value="' +  imgAtrrID + '" />' +
          '</div> ' +
          '</div>' +
          '      <legend>Specific Requirements</legend> ' +
          '      <h4>Specific Requirements</h4> ' +
          '      <div class="sm4 md4 lg10 lg1-offset"> ' +
          '          <div class="field"> ' +
          '            <textarea name="requirements" id="requirements" placeholder="Outline specific requirements relating to your logo" data-validators="required">' + reqVal + '</textarea> ' +
          '            <input type="hidden" id="reqID" value="' +  reqAttrID + '" />' +
          '          </div> ' +
          '      </div>' +
          '<div class="row fluid"> ' +
          '      <div class="sm4 md4 lg10 lg1-offset"> ' +
          '          <button class="red" type="submit" id="editbutton"> Edit </button> ' +
          '      </div>' +
          '</div>'
          '</fieldset>' +
          '</div>';
          jQuery.magnificPopup.open({
            //fixedContentPos: ((platform.platform == 'ios') || (platform.platform == 'android')) ? true : 'auto',
            items: {
              src: htmlContent
            },
            type: 'inline'
            });
      } else {
        alert("No IMG found: ")
      }
    });

    jQuery(document).on('click', '#editbutton', function(event){
          //var instance = jQuery('popup').retrieve('instance');
          event.preventDefault();
          var imgSrcVal = jQuery('#imgselection').val();
          var reqVal = jQuery('#requirements').val();
          var reqIDAtrr = jQuery('#reqID').val();
          var $reqTarget = "#" + reqIDAtrr;
          jQuery($reqTarget).val(reqVal);
          jQuery('#popup').magnificPopup('close');
        });

    jQuery(document).on('click', '.delete-logo', function(event){
                  //var instance = jQuery('popup').retrieve('instance');
                  event.preventDefault();
                  var $this = $(this);
                  var logodiv = jQuery(this).find('input.deletetarget:not("button")');
                  var logobound = jQuery(this).find('input.imgbound:not("button")');
                  var target = logodiv.first().val();
                  var logolink =  logobound.first().val();
                  var $logoTarget = "#" + target;
                  var $logolinkslctr = "#" + logolink;
                  jQuery($logoTarget).detach();
                    if(!jQuery( $logolinkslctr ).hasClass('link')){
                        jQuery($logolinkslctr).addClass("link");
                    }
                    var indexVal = getlogoindex();
                   if(indexVal < 1){
                       var isVisible = jQuery('#emptypool').is(':visible');
                       if(isVisible === false){
                           jQuery('#emptypool').show();
                       }
                   }
                  jQuery('#popup').magnificPopup('close');
        });
