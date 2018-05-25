app.directive('youtubeModal', ['$window', '$compile', 'YT_event', function($window, $compile, YT_event) {

    return {
      restrict: "EA",
  
      link: function($scope, $el, attrs, $rootScope) {
  
          var triggers, triggerClass, activate_trigger, player, modal, modalTpl, modalDims;
  
          modalDims = getModalDims();  
  
          modalTpl = "<div class='modal fade youtube-modal' id='YoutubeModal' tabindex='-1' role='dialog' aria-labelledby='YoutubeModalModalLabel'>"+ 
              "<div class='modal-iframe' style='width:"+modalDims.width+"px; height: "+modalDims.height+"px; margin: 0 auto;'>"+
                  "<div class='modal-iframe-content'>" +
                      "<div class='responsive-embed'>" +
                          "<div class='' id='Youtube-Player'></div>" +
                      "</div>" + 
                      "<div class='text-center modal-close'>" +
                          "<a type='' class=' no-float btn btn-danger' ng-click='closeModal()' aria-label='Close'><span aria-hidden='true'>Close Video</span></a>" +
                      "</div>" + 	
                  "</div>" +
              "</div>" +
          "</div>";
  
          //function createModal
          modal = angular.element(modalTpl);
          $el.append($compile(modal)($scope));
  
          modal.modal({
              show: false,
          }).on({
              'hide.bs.modal': function() { $scope.stopVideo(); }
          });
  
          $scope.addModal(modal);  
          
          triggerClass = (attrs == "") ? '.youtube-link' : '.' + attrs.youtubeModal;
          
          triggers = $el.find(triggerClass);
          activate_trigger = function($trigger) {
              var href = $($trigger).attr('href');
              var yt_target = findYoutubeID(href);
  
              angular.element($trigger).data('yt_target', yt_target).bind('click', function(e) {
                  $scope.play($(this).data('yt_target'));
                  return false;
              })
          }  
  
          $window.onYouTubeIframeAPIReady = function() {
              $scope.initPlayer();
              angular.forEach(triggers, activate_trigger);
          };
  
          
          $scope.$on(YT_event.STOP, function() {
              player.seekTo(0);
              player.stopVideo();
          });
  
          $scope.$on(YT_event.PLAY, function() {
              player.playVideo();
          });
  
          $scope.$on(YT_event.PAUSE, function() {
              player.pauseVideo();
          });
  
          function findYoutubeID(href) {
              var match = href.match(/[http(?:s?)?:]?\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/);
              
              if(!match || !match.length)
                  return false;
  
              return match[1];
          };  
  
          function getModalDims() {
  
              var w = 0, maxW = 0, winH = $window.innerHeight, winW = $window.innerWidth;
  
              maxW = .8 * winW;
              w = (winH / 3) * 4;
  
              if(w > maxW)
                  w = maxW;
                  return {
                      width: Math.round(w),
                      height: Math.round(winH) - 100
                  }
              };
      
      
          }
      };
  }]);