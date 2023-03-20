$(function(){
    
  /**
   * spot slide
   * @sort
   * [1-hot]
   * [2-new]
   * [3-mood]
   * @data : mainProgramData
   */
  function mainProgramData(sort){
    fetch('./assets/data/mainProgramData.json')
    .then((response) => response.json())
    .then((json) => {
        data = json.items;

        result = (sort === '1') ? data : data.filter(function (parm) {return parm.sort == sort });
  
        let html = '';
        result.forEach(element => {
            html+=` <div class="swiper-slide">
            <div class="img-wrap" >
                <div class="img-box" style="background:${element.snippet.themeColor}">
                    <img src="${element.snippet.thumbnail}" alt>
                </div>
            </div>
            <div class="txt-box">
                <strong class="title"><a href="">${element.snippet.title}</a></strong>
                <p class="desc">${element.snippet.desc}</p>
            </div>
        </div>`
            
        });
  
        $('#dataList1').html(html)
        
        var spotswiper = new Swiper('.spot-slide', {
          slidesPerView: 'auto',
          centeredSlides: true,
          initialSlide: 5,
          loop: true,
          pagination: {
            el: '.pagination',
            clickable: true
          },
       
        });
      })
  }
  mainProgramData();

  /**
   * menu #sideBar나타내기
   */
      $('.header .btn-menu').click(function(){
        $('#sideBar').addClass('on');
        $('.dimd').addClass('on').fadeIn();
        $('body').addClass('notScroll');
    });

    $('#sideBar .btn-close, .dimd').click(function(){
        $('#sideBar').removeClass('on');
        $('.dimd').removeClass('on').fadeOut();
        $('body').removeClass('notScroll');
    });

  /*
    * spot section 탭메뉴
    */
  $('.spot .tab-item').click(function(e){
    e.preventDefault();
    sort = $(this).data('sort');
    $(this).addClass('on').siblings('li').removeClass('on')
    mainProgramData(sort);
  })
  $(".spot .tab-item.on").trigger("click");


  /**
   * common-slide
   */
  var commonSlide = new Swiper(".common-slide", {
    slidesPerView: 2.3,
    spaceBetween: 10,
    breakpoints: {
        
      768: {
        slidesPerView: "auto",
        spaceBetween: 20,
      }
    },
  });

  /***
   * 
   * 라이브이벤트
   * @data : scheduleData
   */
    var now = new Date();
    // 현재시간 
    var hours = now.getHours();       // 현재 시간
    var minutes = now.getMinutes();   // 현재 분

    fetch('./assets/data/scheduleData.json')
    .then((response) => response.json())
    .then((json) => {
        data = json.items;
  
        let html = '';
        data.forEach(element => {

          if((element.snippet.time.starhours - hours) <= 1 && (element.snippet.time.endhours - hours) >= 1){
            live = 'on';
          }else{
            live = '';
          }


          html += `<div class="swiper-slide">
                    <a href="">
                        <div class="img-box verti">
                            <img src="${element.snippet.thumbnail}" alt>
                            <div class="info">
                                <em class="date">${element.snippet.date}</em>
                                <strong>${element.snippet.time.starhours}:${element.snippet.time.starMin} ~ ${element.snippet.time.endhours}:${element.snippet.time.endMin}</strong>
                                <i class="ico-time ${live}" aria-label="LIVE ON"></i>
                            </div>
                        </div>
                        <div class="txt-box">
                            <strong class="title">${element.snippet.title}</strong>
                            <span class="desc">${element.snippet.desc}</span>
                        </div>
                    </a>
                </div>`
            
        });
  
        $('#dataList2').html(html)
      
    })

  /**
   * event-slide
   */
  var eventSlide = new Swiper(".event-slide", {
    slidesPerView: 1.2,
    spaceBetween: 10,
    breakpoints: {
        
      768: {
        slidesPerView: "auto",
        spaceBetween: 20,
      }
    },
    });

  /**
   * starlog-slide
   */
  var starlogSlide = new Swiper(".starlog-slide", {
    slidesPerView: 3.2,
    spaceBetween: 10,
    breakpoints: {
        
      768: {
        slidesPerView: "auto",
        spaceBetween: 20,
      }
    },
    });

  /**
   * podcast 앵커이동
   */
  $('.podcast .swiper-slide a').click(function(e){
    e.preventDefault();
    anchor = $(this).data('target');
    anchorMove = $('.program').offset().top

    $('html,body').animate({scrollTop:anchorMove-50});
    $(anchor).addClass('on').siblings('.program .program-box').removeClass('on');

    $('.program .tab-item').eq(2).trigger('click');

    $('.category-box a').each(function(i,item){
      if($(this).attr('href') == anchor){
        $(this).parent().addClass('on').siblings().removeClass('on')
      }
    })
  })

   /**
     * 팟캐스트 탭메뉴
     */
   $('.program .tab-item').click(function(e){
    e.preventDefault();
    target = $(this).find('a').attr('href');
    $(this).addClass('on').siblings('li').removeClass('on')
    $(target).addClass('on').siblings('.program .program-area').removeClass('on')
  })

  //팟캐스트 하위 탭메뉴
  $('.program .category-item').click(function(e){
    e.preventDefault();
    target = $(this).find('a').attr('href');
    $(this).addClass('on').siblings('li').removeClass('on')
    $(target).addClass('on').siblings('.program .program-box').removeClass('on')
  })
    
  /**
   * btn-top
   */
    $(window).scroll(function(){
      var target = $(window).scrollTop();
      if(target == 0){
        $(".btn-top").fadeOut()
      }else{
        $(".btn-top").fadeIn()
      }
    });


    $('.btn-top').click(function(){
      $('html,body').animate({scrollTop:0});
    })























})

