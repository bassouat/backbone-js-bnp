


var Song = Backbone.Model.extend({
    defaults:{
        genre:'musique ivoirienne'
    },
    validate:function (attrbs){
        if(!attrbs.titre){
            return "le titre est requis";
        }
    }
});

var song = new Song({ id:15,artist:'josey',

    prix:15});
song.set({ artist:'lil wayne',

    prix:150})
// console.log(song.get('artist'));
// console.log(song.has('prix'));

var Animal = Backbone.Model.extend({
   walk:function (){
       console.log("he is walking");
   }
});

var Dog = Animal.extend({
    walk:function () {
        console.log("j'adore Rachel");
        Animal.prototype.walk.apply(this);
    }
});

var dog = new Dog();

// dog.walk();

var Songs = Backbone.Collection.extend({
    model:song
});

var songs = new Songs([
    new Song({ id:2, artist:'Bile Didier'}),
    new Song({id:3, artist:'RAS'}),
    new Song({id:4, artist:'DJ Arafat'}),
    new Song({id:5, artist:'Jimmy Hyacinthe'}),
]);

songs.add(new Song({id:6,artist:'NAS' ,prix:'18€'}));
songs.add(new Song({id:7, artist:'snoop dogg',etat:'US'}),{at:1});

console.log(songs.toJSON());

songs.push(new Song({artist:'Jim Jones',etat:'US'}));
console.log(songs.toJSON())
songs.pop();

console.log(songs.toJSON());

var bileArtist = songs.where({artist:'Bile Didier'});

console.log(bileArtist);
/*
songs.each(function (song) {
    console.log(song)
})
*/
var SongView = Backbone.View.extend({
  tagName:'li',
    // events:{
    //    'click':'onClick',
    //     'click.bookmark':'onBookmarkclick'
    // },
    // onClick:function (e){
    //     e.stopPropagation();
    //     console.log("basseydou est un roi")
    // },
    // onBookmarkclick:function (){
    //
    //     console.log("portabilité")
    // },
    /*className:'song',
    id:'bass',
    attributes:{
      'data-genre':'Jazz',
    },*/
    initialize:function (){
        this.model.on("change",this.render,this)
    },
    render:function (){
        /*this.$el.html(this.model.get('artist')+"- genre: "+ this.model.get('genre') + " <button type='button'>Listen</button> <button type='button' class='bookmark'>BookMark</button>");
        this.$el.attr('id',this.model.id);*/
        var template = _.template($("#songTemplate").html());
        var htmlTemplate = template(this.model.toJSON());
        this.$el.html(htmlTemplate);

        return this;
    }
});

var SongsView = Backbone.View.extend({
    tagName:'ul',

    initialize:function (){
        this.collection.on("add",this.onSongAdded,this);
        this.collection.on("remove",this.removedSong,this);
    },
    onSongAdded:function (song){
        var songView = new SongView({model:song});
        this.$el.append(songView.render().$el);
    },
    removedSong:function (song){
        //this.$el.find('li#'+ song.id).remove();
        this.$('li#'+song.id).remove();
    },
    render:function () {
        var self = this;
        this.collection.each(function (song){
            var songView = new SongView({model:song});
           self.$el.append(songView.render().$el)
        })
    }
});
var songView = new SongView({el:'.songs',model: song});
songView.render();

// var songsView = new SongsView({el:'.songs',collection:songs});
// songsView.render();

var person = {
  name:'Basseydou',
    walk:function(){
      this.trigger('walking');
    }
};

_.extend(person,Backbone.events);