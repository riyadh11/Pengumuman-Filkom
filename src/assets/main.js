          $(".button-collapse").sideNav();
          var objP;
          var objB;
          var pengumuman=false;
          var berita=false;
          var hadir=false;

          function get_pengumuman() {
            load();
            if(pengumuman!=true){
              var url="http://filkom.ub.ac.id/module/api/conf/get_pengumuman/in";
              fetch(url).then(function(response) {
                return response.text().then(function(text) {
                  objP=JSON.parse(atob(text));
                  pengumuman=true;
                  $.each( objP, function( key, value ) {
                    var html=
                    '<div class="card small z-depth-1"><div class="card-image">'+
                      '<img src="http://file.filkom.ub.ac.id/fileupload/assets/upload/file/PTIIK/konten/2015-01/header-2.jpg">'+
                      '<span class="card-title">'+this.post_title+'</span>'+
                    '</div>'+
                    '<div class="card-content">'+
                      '<p>'+this.post_content+'</p>'+
                    '</div>'+
                    '<div class="card-action">'+
                      '<a onclick="get_pengumuman_detail('+this.content_id+')">Baca Lebih Lanjut</a>'+
                    '</div>'+
                      '</div>';
                    $("#isi-list-pengumuman").append(html);
                    clear();
                    $("#pengumuman").removeAttr('hidden');
                  });
                });
              }).catch(function(){
                clear();
                $("#offline").removeAttr('hidden');
              });;  
            }else{
              clear();
              $("#pengumuman").removeAttr('hidden');
            }
            $(".title-logo").html("<i>Pengumuman</i>");
          }

          function get_pengumuman_detail(id) {
            load();
            $.each( objP, function( key, value ) {
                  if(this.content_id==id){
                    var html=sanitize(this.post_content);
                    var title=this.post_title;
                  }
                  $("#isi-pengumuman").html(html)
                  $("#judul-pengumuman").html(title);
                  clear();
                  $("#pengumuman-detail").removeAttr('hidden');
                });
            $(".title-logo").html("<i>Pengumuman</i>");
          }

          function get_berita() {
            load();
            if(berita!=true){
              var url="http://filkom.ub.ac.id/module/api/conf/get_berita/in";
              fetch(url).then(function(response) {
                return response.text().then(function(text) {
                  objB=JSON.parse(atob(text));
                  berita=true;
                  $.each( objB, function( key, value ) {
                    var html=
                    '<div class="card small z-depth-1"><div class="card-image">'+
                      '<img src="http://file.filkom.ub.ac.id/fileupload/assets/'+this.thumb_img+'">'+
                    '</div>'+
                    '<div class="card-content">'+
                      '<p><bold>'+sanitize(this.post_title)+'</bold></p>'+
                    '</div>'+
                    '<div class="card-action">'+
                      '<a onclick="get_berita_detail('+this.content_id+')">Baca Lebih Lanjut</a>'+
                    '</div>'+
                      '</div>';
                    $("#isi-list-berita").append(html);
                    clear();
                    $("#berita").removeAttr('hidden');
                  });
                });
              }).catch(function(){
                clear();
                $("#offline").removeAttr('hidden');
              });  
            }else{
              clear();
              $("#berita").removeAttr('hidden');
            }
            $(".title-logo").html("<i>Berita</i>");
          }

          function get_berita_detail(id) {
            load();
            $.each( objB, function( key, value ) {
                  if(this.content_id==id){
                    var html=sanitize(this.post_content);
                    var title=this.post_title;
                    var thumb="http://file.filkom.ub.ac.id/fileupload/assets/"+this.thumb_img;
                  }
                  $("#isi-berita").html(html)
                  $("#judul-berita").html(title);
                  $("#thumb_berita").attr('src', thumb);
                  clear();
                  $("#berita-detail").removeAttr('hidden');
                });
            $(".title-logo").html("<i>Berita</i>");
          }

          function get_dosen() {
            load();
            if(hadir!=true){
              var url="http://filkom.ub.ac.id/module/api/conf/get_civitas/dosen";
              fetch(url).then(function(response) {
                return response.text().then(function(text) {
                  objP=JSON.parse(atob(text));
                  hadir=true;
                  $.each( objP, function( key, value ) {
                    if(this.hadir){
                      var work='work';
                      var keterangan="Hadir";
                    }else{
                      var work='explore';
                      var keterangan="Tidak Hadir";
                    }
                    if(this.foto){
                      var foto='http://file.filkom.ub.ac.id/fileupload/assets/'+this.foto;
                    }else{
                      var foto="https://pbs.twimg.com/profile_images/1389902280/icon_400x400.jpg";
                    }
                    var html='<li class="collection-item avatar">'+
                    '<img src="'+foto+'" alt="" class="circle">'+
                    '<span class="title">'+this.nama+'&nbsp;&nbsp;</span>'+
                    '<div class="chip">'+keterangan+'</div>'+
                    '<p><b>NIK</b>&nbsp;&nbsp;&nbsp&nbsp;&nbsp;&nbsp;:&nbsp;'+this.nik+'<br>'+
                    '<b>Ruang</b>&nbsp;:&nbsp;'+this.ruangkerja+'</p>'+
                    '<a href="mailto:'+this.email+'" class="secondary-content"><i class="material-icons">mail</i></a>'+
                    '</li>';
                    $("#isi-list-dosen").append(html);
                    clear();
                    $("#dosen").removeAttr('hidden');
                  });
                });
              }).catch(function(){
                clear();
                $("#offline").removeAttr('hidden');
              });;  
            }else{
              clear();
              $("#dosen").removeAttr('hidden');
            }
            $(".title-logo").html("<i>Daftar Hadir</i>");
          }

          function get_home() {
            load();
            clear();
            $("#home").removeAttr('hidden');
          }

          function get_tentang() {
            load();
            clear();
            $("#tentang").removeAttr('hidden');
          }

          $(document).ready(function(){
            $('.parallax').parallax();
          });

          function sanitize(text) {
           cgahref=text;
           for(var x=0;x<10;x++){
            var cgsrc=cgahref.replace(/src="upload/i,'src="http://file.filkom.ub.ac.id/fileupload/assets/upload');
            var cgahref=cgsrc.replace(/href="\/kcfinder\//i,'href="http://filkom.ub.ac.id/kcfinder/');
           }
            return cgahref;
          }

          function clear() {
            $("#berita-detail").attr('hidden','true');
            $("#pengumuman").attr('hidden','true');
            $("#pengumuman-detail").attr('hidden','true');
            $("#berita").attr('hidden', 'true');
            $("#offline").attr('hidden', 'true');
            $("#home").attr('hidden', 'true');
            $("#dosen").attr('hidden', 'true');
            $("#tentang").attr('hidden', 'true');
            $(".loader").removeClass('progress');
          }

          function load() {
            $(".loader").addClass('progress');
          }
