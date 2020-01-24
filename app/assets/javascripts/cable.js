// Action Cable provides the framework to deal with WebSockets in Rails.
// You can generate new channels where WebSocket features live using the `rails generate channel` command.
//
//= require action_cable
//= require_self
//= require_tree ./channels

(function() {
  this.App || (this.App = {});

  App.cable = ActionCable.createConsumer();

// Card の Drag & Drop を操作可能にする
// addeventlistener() にイベントと対応させたメソッド参照を登録する
class DropPoint {
  onDragOver(event) {
    event.preventDefault()

    // TIPS: Drop したい位置に hover したら、ハイライトする CSS スタイルを当てて反応を示すことができる
    // if(!this.classList.contains('drop-point_hover')) {
    //   this.classList.add('drop-point_hover')
    // }
  }

  onDragLeave(event) {
    // TIPS: Drop したい位置から離れたら、CSS スタイルを外して反応を示すことができる
    // if(this.classList.contains('drop-point_hover')) {
    //   this.classList.remove('drop-point_hover')
    // }
  }

  onDragEnd(event) {
    //
    // TIPS: Drag 操作が終わったら #drop-point を非表示に切り替えることもできる
    //

    // var targetElements = document.querySelectorAll('#drop-point')

    // targetElements.forEach((elm) => {
    //   if(!elm.classList.contains('drop-point_hidden')) {
    //     elm.classList.add('drop-point_hidden')
    //   }
    //   if(elm.classList.contains('drop-point_hover')) {
    //     elm.classList.remove('drop-point_hover')
    //   }
    // })
  }

  onDragEnter(event) {
    // Implement some function when need.
  }

  // Drag & Drop のために dataTransfer に要素の情報を格納する
  onDragStart(event) {
    // TIPS: Drag 操作を開始したタイミングでクラスの付与・除去ができる
    // var targetElements = document.querySelectorAll('#drop-point')
    // targetElements.forEach((elm) => {
    //   elm.classList.remove('drop-point_hidden')
    // })

    // Drag & Drop でのデータ転送準備に値をセット
    event.dataTransfer.setData("text/plain", event.target.id) // Drag された要素の ID 属性値をセット
  }

  // Card を #drop-point に Drag & Drop したときに Card を移動する
  onDrop(event) {
    var cardId = event.dataTransfer.getData("text") // Drop された要素のデータ(= ID 属性値) を読み取り
    var card = document.getElementById(cardId) // Drop されてきた要素を取得

    var baseCardInsertPosition =
      document.getElementById('drop-point')

    baseCardInsertPosition.appendChild(card)

    card.draggable = false // 移動先に固定

    event.dataTransfer.clearData()
  }

  // Drag & Drop したい各要素に対して、対応するイベント に/の メソッドの登録
  initDropPoint() {
    // Drag 可能にするカード群
    var targetCardElements = document.querySelectorAll('.card')
    // Drop 操作受け入れ先
    var targetDropPointElements = document.querySelectorAll('#drop-point')

    targetCardElements.forEach((elm) => {
      elm.addEventListener('dragstart', this.onDragStart)
      elm.addEventListener('dragend', this.onDragEnd)
    })

    targetDropPointElements.forEach((elm) => {
      // elm.addEventListener('dragenter', this.onDragEnter) // No any implemented yet.
      elm.addEventListener('dragover', this.onDragOver)
      elm.addEventListener('dragleave', this.onDragLeave)
      elm.addEventListener('drop', this.onDrop)
    })
  }
}

//
// ページ読み込み時に Drag & Drop 操作の処理を各イベントに登録
//

var dropPoint = new DropPoint()

document.addEventListener('DOMContentLoaded', function() {
  dropPoint.initDropPoint();
});

// Rails の turbolinks イベントにも登録
// document.addEventListener('turbolinks:load', function() {
//   dropPoint.initDropPoint();
// });
}).call(this);
