import Article from "../models/article";

const createNewArticle = () => Article.create({
    title: "Unveiling the Mysteries of the Abyss: Delving into the Enigmatic Realm of Black Holes",
    imageUrl: "https://images.unsplash.com/photo-1640984756059-7303641db7cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmxhY2slMjBob2xlfGVufDB8fDB8fHww&auto=format&fit=crop&w=1000&q=60",
    content: "Scientists and astronomers have embarked on a relentless quest to unravel the secrets held within these gravitational anomalies. Through groundbreaking research and technological advancements, we are beginning to shed light on the birth, evolution, and potential role of black holes in shaping our universe.",
    access: "Premium"
});

export default createNewArticle;