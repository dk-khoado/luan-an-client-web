
var data = [];
data.push({content : "Hello","mySeft" : true})
data.push({content : "Hi","mySeft" : false})
data.push({content : "Oke","mySeft" : true})
data.push({content : "Oke lần 2","mySeft" : false})

function renderItem(content, time, image, mySeft) {

    var incomingItem = `<div class="incoming_msg">
    <div class="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"> </div>
    <div class="received_msg">
      <div class="received_withd_msg">
        <p> ${content}</p>
        <span class="time_date"> 11:01 AM    |    Yesterday</span></div>
    </div>
  </div>`;

    var outcomingItem = `<div class="outgoing_msg">
  <div class="sent_msg">
    <p>${content}</p>
    <span class="time_date"> 11:01 AM    |    Today</span> </div>
</div>`;
    if (mySeft) {
        return outcomingItem;
    }
    else {
        return incomingItem;
    }
}

$(document).ready()
{
    data.forEach(element => {
        $('#displaychat').append(renderItem(element.content,"","",element.mySeft));
    });
}

function sendChat()
{
    let content = $('#content').val();
    data.push({content: content,"mySeft" : true})
    $('#displaychat').append(renderItem(content,"","",true));
    $('#content').val("");
    $('#displaychat').scrollTop($('#displaychat')[0].scrollHeight);
    return false;

}
$(document).ready( () =>{
    var peer = new Peer(name,{
        host: 'server-real-time.herokuapp.com',
        path:  '/p2p',
        port:80
    })

    peer.on('open', function(id)
    {
        console.log('My ID', id);
    })
})
