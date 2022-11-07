import { IonContent, IonHeader, IonPage, IonSearchbar, IonTitle, IonToolbar, IonButton, IonIcon, IonButtons, IonRow, IonCol, IonImg, IonItem } from "@ionic/react"
import { useEffect, useState } from "react"
import { arrowBackOutline, arrowForwardOutline } from "ionicons/icons"

const Home: React.FC = () => {
  const [search, setSearch] = useState("random")
  const [page, setPage] = useState(1)

  const handleChange = (ev: any) => {
    setSearch((prev) => (ev.detail.value ? ev.detail.value : prev))
    setPage((prev) => (ev.detail.value ? 1 : prev))
  }
  const [data, setData] = useState({
    total: 0,
    results: [
      { id: "fjjf", likes: "12", alt_description: " sss", user: { name: "fg" }, urls: { small: "https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1513542789411-b6a5d4f31634" } },
    ],
  })

  // `https://api.unsplash.com/photos/fIq0tET6llw?client_id=A7QlyQ2pxZszePhVk3gzYaeTGy6zy4e11wUNBO7hrJc`
  useEffect(() => {
    fetch(`https://api.unsplash.com/search/photos?page=${page}&query=${search}&client_id=A7QlyQ2pxZszePhVk3gzYaeTGy6zy4e11wUNBO7hrJc`)
      .then((response) => response.json())
      .then((data) => setData(data))
  }, [search, page])

  console.log(data)

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Image Gallery {": " + page + " / 10"}</IonTitle>
        </IonToolbar>
        <IonToolbar>
          <IonSearchbar showClearButton="focus" placeholder="Random" onIonChange={(ev) => handleChange(ev)}></IonSearchbar>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {/* <IonRefresher slot="fixed" onIonRefresh={() => setPage(prev => 1)}>
          <IonRefresherContent pullingIcon={chevronDownCircleOutline} pullingText="Pull to refresh" refreshingSpinner="circles" refreshingText="Refreshing...">
          </IonRefresherContent>
        </IonRefresher> */}
        <IonRow>
          {data.results.map((item) => (
            <IonCol size="6">
              <IonItem routerLink={`/${item.id}`}>
                <IonImg src={item.urls.small} />
              </IonItem>
            </IonCol>
          ))}
        </IonRow>
      </IonContent>

      <IonToolbar>
        <IonTitle>Navigation Buttons</IonTitle>
        <IonButtons slot="end">
          <IonButton
            disabled={page === 1}
            onClick={() => {
              setPage((prev) => prev - 1)
            }}
          >
            <IonIcon slot="icon-only" icon={arrowBackOutline} />
          </IonButton>
          <IonButton
            disabled={page === data.total}
            onClick={() => {
              setPage((prev) => prev + 1)
            }}
          >
            <IonIcon slot="icon-only" icon={arrowForwardOutline} />
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonPage>
  )
}

export default Home
