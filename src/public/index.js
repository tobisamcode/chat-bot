const chatForm = document.querySelector("#chat-form");
const chatScreen = document.getElementById("message-list");

var myInput = document.getElementById("message-input");
myInput.inputmode = "numeric";

const socket = io();

//**Event Listeners */

socket.on("welcome", (serverMessage) => {
  welcomeMessage(serverMessage);
});
socket.on("mainMenu", (serverMessage) => {
  mainMenu(serverMessage);
});

socket.on("customerMessage", (serverMessage) => {
  customerMessage(serverMessage);
});

socket.on("menu", (serverMessage) => {
  showMenu(serverMessage);
});

socket.on("orderPlaced", (serverMessage) => {
  placeOrder(serverMessage);
});

socket.on("orderHistory", (serverMessage) => {
  orderHistory(serverMessage);
});

socket.on("currentOrder", (serverMessage) => {
  currentOrder(serverMessage);
});

socket.on("simpleMessage", (serverMessage) => {
  simpleMessage(serverMessage);
});

let menuDisplayed = false;

//**Add event listener to input field */

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = e.target.elements.message.value;

  socket.emit("customerMessage", message);

  switch (message) {
    case "1":
      socket.emit("getMenu", "1");
      menuDisplayed = true;
      break;
    case "99":
      socket.emit("checkoutOrder", message);
      break;
    case "98":
      console.log("front");
      socket.emit("orderHistory", message);
      break;
    case "97":
      socket.emit("currentOrder");
      break;
    case "0":
      socket.emit("cancelOrder");
      break;
    case "10":
      socket.emit("mainMenu");
      break;
    default:
      if (menuDisplayed && message >= "100" && message <= "108") {
        socket.emit("placeOrder", message);
        menuDisplayed = false;
      } else {
        socket.emit("chatMessage", message);
      }
  }

  e.target.elements.message.value = "";
  e.target.elements.message.focus();
});

//** Functions definitions */

function welcomeMessage(serverMessage) {
  const messageList = document.querySelector("#message-list");
  const newMessageListItem = document.createElement("div");

  newMessageListItem.innerHTML = `
    
 <div class="chat-message chatbot">
  <div class="message">
    <p class="meta"> ${serverMessage.user} <span>${serverMessage.time}</span></p>
    <p class="text">
       ${serverMessage.msg}
    </p>
     </div>
  </div>`;
  messageList.appendChild(newMessageListItem);
  chatScreen.scrollTop = chatScreen.scrollHeight;
}

function mainMenu(serverMessage) {
  const messageList = document.querySelector("#message-list");
  const newMessageListItem = document.createElement("div");
  newMessageListItem.innerHTML = `
    
<div class="chat-message chatbot">
 <div class="message">
    <p class="meta"> ${serverMessage.user} <span>${serverMessage.time}</span></p>
    <p class="text">
       ${serverMessage.msg}
    </p>
    </div>
  </div>`;
  messageList.appendChild(newMessageListItem);
  chatScreen.scrollTop = chatScreen.scrollHeight;
}

function placeOrder(serverMessage) {
  const messageList = document.querySelector("#message-list");
  const newMessageListItem = document.createElement("div");
  newMessageListItem.innerHTML = `
<div class="chat-message chatbot">
<div class="message">
  <p class="meta"> ${serverMessage.user} <span>${serverMessage.time}</span></p>

  <p class="text">
  Added to cart: </br>
  Ordered: ${serverMessage.msg.orderedItem}  </br>
  Price: ${serverMessage.msg.orderedPrice}</br>
Ordered on: ${serverMessage.msg.orderedAT}.
    </p>
   press 99 to checkout order </br>
   Press 1 to make a new order </br>
   Press 10 to go back to the main menu
   </div>
   </div>`;

  messageList.appendChild(newMessageListItem);
  chatScreen.scrollTop = chatScreen.scrollHeight;
}

function showMenu(serverMessage) {
  const messageList = document.querySelector("#message-list");
  const newMessageListItem = document.createElement("div");
  const menu = [];
  serverMessage.msg.forEach((item) =>
    menu.push(
      "Select " + item.id + " to order " + item.name + ", " + " ₦" + item.price
    )
  );
  const menuItems = menu.map((menuItem) => `<br>${menuItem}`).join("");

  newMessageListItem.innerHTML = `
<div class="chat-message chatbot">
<div class="message">
  <p class="meta"> ${serverMessage.user} <span>${serverMessage.time}</span></p>
  <p>Please make your order:</p>
  <p class="text">
     ${menuItems}
  </p>
  <p>Press 10 to go back to the main menu</p>

</div>
</div>`;

  messageList.appendChild(newMessageListItem);
  chatScreen.scrollTop = chatScreen.scrollHeight;
}

function orderHistory(serverMessage) {
  const messageList = document.querySelector("#message-list");

  serverMessage.msg.forEach((checkout) => {
    const newMessageListItem = document.createElement("div");
    const menu = [];
    let total = 0;

    checkout.forEach((item) => {
      menu.push(item.id + "  " + item.name + ": " + " ₦" + item.price);
      total += parseFloat(item.price);
    });

    const menuItems = menu.map((menuItem) => `<br>${menuItem}`).join("");

    newMessageListItem.innerHTML = `
      <div class="chat-message chatbot">
      <div class="message">
        <p class="meta">${serverMessage.user} <span>${serverMessage.time}</span></p>
        <p>Order history</p>
        <p class="text">
          ${menuItems}</br>
          Total: ₦${total}
        </p>
        <p>Press 10 to go back to the main menu</p>
      </div>
      </div>`;

    messageList.appendChild(newMessageListItem);
  });

  chatScreen.scrollTop = chatScreen.scrollHeight;
}

function customerMessage(serverMessage) {
  const messageList = document.querySelector("#message-list");
  const newMessageListItem = document.createElement("div");

  newMessageListItem.innerHTML = `
    <div class="chat-message customer">
     <div class="message">
      <p class="meta">${serverMessage.user} <span>${serverMessage.time}</span></p>
      <p>${serverMessage.msg}</p>
     
    </div>
    </div>`;

  messageList.appendChild(newMessageListItem);
  chatScreen.scrollTop = chatScreen.scrollHeight;
}

function currentOrder(serverMessage) {
  const messageList = document.querySelector("#message-list");
  const newMessageListItem = document.createElement("div");

  const currentOrders = [];

  serverMessage.msg.forEach((order) => {
    currentOrders.push(`
    food: ${order.name}<br>
    price: ₦${order.price}<br>
    ordered on: ${order.orderDate}<br>
  `);
  });

  const currentOrder = currentOrders.join("<br>");

  newMessageListItem.innerHTML = `
     <div class="chat-message chatbot">
      <div class="message">
        <p class="meta">${serverMessage.user} <span>${serverMessage.time}</span></p>
        <p>Current Order</p>
        <p class="text">
          ${currentOrder}</br>
                </p>
      press 99 to checkout order </br>
      Press 10 to go back to the main menu </br>
      </div>
      </div>`;

  messageList.appendChild(newMessageListItem);

  chatScreen.scrollTop = chatScreen.scrollHeight;
}

function simpleMessage(serverMessage) {
  const messageList = document.querySelector("#message-list");
  const newMessageListItem = document.createElement("div");

  newMessageListItem.innerHTML = `
    <div class="chat-message chatbot">
     <div class="message">
      <p class="meta">${serverMessage.user} <span>${serverMessage.time}</span></p>
      <p>${serverMessage.msg}</p>
      <p>Press 10 to go back to the main menu</p>
    </div>
    </div>`;

  messageList.appendChild(newMessageListItem);
  chatScreen.scrollTop = chatScreen.scrollHeight;
}
