class Food{
    constructor(){
        this.milkImage = loadImage("milk.png");;
        this.foodStock = database.ref("food").on("value", readStock(foodS));
        
        
    }

    getFoodStock(){
        database.ref('food').on("value",(data)=>{
            food = foodStock;
        });
    }

    updateFoodStock(){
        database.ref("/").update({
            food:foodS
        })


    }
    deductFood(){
        
    }
    display(){
        var x=80,y=100;
        imageMode(CENTER);
        image(this.milkImage,720,220,70,70);

        if(this.foodStock!==0){
            for(var i =0;i<this.foodStock;i++){
                if(i%10===0){
                    x=80;
                    y=y+50;
                }
                image(this.milkImage,x,y,70,70);
                x = x+30;
            }
        }
        
    }
}
