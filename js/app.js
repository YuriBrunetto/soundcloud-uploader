SC.initialize({
    client_id: "b17b79b20e5c687a994a0d517dabe98a",
    redirect_uri: "http://yuribrunetto.github.io/soundcloud-uploader/callback.html"
});

function updateTimer(ms) {
    ms = ms / 1000;
    $("#timer").html(Math.floor(ms));
}

$(function(){
    $("#stopRecording, #play, .form, .timer").hide();

    $("#startRecording").click(function(e){
        e.preventDefault();
        SC.record({
            progress: function(ms){
                updateTimer(ms);
            }
        });

        $("#startRecording").hide();
        $("#stopRecording, .timer").show();
    });

    $("#stopRecording").click(function(e){
        e.preventDefault();

        SC.recordStop();

        $("#play, .form").show();
        $("#stopRecording").hide();
    });

    $("#play").click(function(e){
        e.preventDefault();

        SC.recordPlay();
    });

    $('#upload').click(function(e) {
        e.preventDefault();

        var name    = $("#name").val(),
            privacy = $("input[name=privacy]:checked").val();

        console.log(privacy);

        if (name == "" || privacy == "undefined") {
            $("#name").css("border-color", "#e74c3c");
            $("input[type=radio]").parent().parent().find("div.input").css("border-color", "#e74c3c");
        } else {
            $("#name").css("border-color", "#f9f9f9");
            $("input[type=radio]").parent().parent().find("div.input").css("border-color", "#f9f9f9");
            SC.connect({
                connected: function(){
                    $(".status").html("Uploading...");
                    $(".form").slideUp();
                    SC.recordUpload({
                        track: {
                            title: name,
                            sharing: privacy
                        }
                    }, function(track) {
                        $(".status").html(
                            "Uploaded! <a href='" + track.permalink_url + "' target='_blank' title='" + track.title + "'>" + track.title + "</a>"
                        );
                    });
                }
            });
        }
    });
});
