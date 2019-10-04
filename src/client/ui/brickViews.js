

const brickViews = (function(){

  return {
    
    typesignatureBrickHTML: function(){

    }, 

    typeBrickHTML: function(){
      return [`<div  ID='${this.htmlID}' `, 
      `class="${this.cssClasses.join(' ')}" `, 
      ` style='z-index:10; background-color:${this.backgroundColor}'>`, 
      this.label , 
      `</div>`].join('')
    }, 

    pugBrickHTML: function(){
      return [`<div  ID='${this.htmlID}' `, 
      `class="${this.cssClasses.join(' ')}" `, 
      `style='position:absolute;'>`, 
      this.label , 
      `</div>`].join('')

    }, 

    connectorBrickHTML: function(){

    }, 

    groupBrickHTL: function(){

    },

    programBrickHTML: function(){

    } 

  }
})()

module.exports = {
    brickViews
}
