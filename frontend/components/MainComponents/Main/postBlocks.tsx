const PostsBlock = (<div >{next && next.map((obj: Post) => {

    const a = new Date(obj.createdAt);
    const b = new Date();


    return (

        <div key={obj.id} >
            <Link href='#'/*{`/post/${obj.id}`} */key={obj.id}><a onClick={async()=>await getPost(obj.id)}>
                <ul className={styles.block}>
                    {obj.author.avatar && <Image
                        loader={minioImageLoader}
                        width='50px'
                        height='50px'
                        objectFit="cover"
                        alt="Picture of the category"
                        src={obj.author.avatar}
                    />}

                    {obj.author.username}
                    <span className={styles.postDate}>{dateDiffInHours(a, b) < 24 ? (dateDiffInHours(a, b) + ' hours') : (dateDiffInDays(a, b) + ' days')} </span>
                    <p className={styles.title}>
                        {obj.title}
                    </p>
                    {JSON.parse(obj.content).map((e: any) => {
               
                        

                        switch (e.type) {
                            case 'paragraph':
                                return <p>{e.data.text}</p>
                                break;
                            case "image":
                                return <ImagePost data={e.data} />
                                break;

                        }

                    })}
                    <li>
                        <div className={styles.mainHeader}>

                            <div className={styles.comments} key={obj.id}>
                                <a key={obj.id}>
                                    <p className={styles.text}>
                                        {obj.comments.map((e: any) => (
                                            <div>
                                                {e.content}
                                                <button>
                                                    {e.likes}
                                                </button>
                                            </div>
                                        ))}
                                    </p>
                                </a>

                            </div>

                        </div>

                    </li>
                </ul>
            </a>
            </Link>
        </div>

    )
})}</div>)
