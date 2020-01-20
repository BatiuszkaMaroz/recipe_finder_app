export default class Likes {
  constructor() {
    this.likes = [];
  }

  addLike(id, title, author, img) {
    const like = { id, title, author, img };
    this.likes.push(like);
    return like;
  }

  deleteLike(id) {
    const idx = this.likes.findIndex(elm => elm.id === id);
    this.likes.splice(idx, 1);
  }

  isLiked(id) {
    return !!this.likes.find(elm => elm.id === id);
  }

  getNumOfLikes() {
    return this.likes.length;
  }
}
