import { IonBackButton, IonButtons, IonCol, IonContent, IonHeader, IonIcon, IonImg, IonPage, IonRow, IonText, IonTitle, IonToolbar } from "@ionic/react"
import { useState, useEffect } from "react"
import { useParams } from "react-router"
import { arrowBackOutline } from "ionicons/icons"

interface ScanNewProps {
  isUser: boolean
}

const Image: React.FC<ScanNewProps> = ({ isUser }) => {
  type routeParams = {
    imageId: string
  }
  const { imageId } = useParams<routeParams>()
  console.log(isUser, imageId, "om")

  const [item, setItem] = useState({
    id: "fjjf",
    likes: "12",
    alt_description: " sss",
    user: { name: "fg" },
    urls: { small: "https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1513542789411-b6a5d4f31634" },
  })

  useEffect(() => {
    fetch(`https://api.unsplash.com/photos/${imageId}?client_id=A7QlyQ2pxZszePhVk3gzYaeTGy6zy4e11wUNBO7hrJc`)
      .then((response) => response.json())
      .then((data) => setItem(data))
  }, [imageId])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Image Details</IonTitle>
          <IonButtons slot="start">
            <IonBackButton>
              <IonIcon slot="icon-only" icon={arrowBackOutline} />
            </IonBackButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRow class="scroll-content">
          <IonCol size="6">
            <IonImg src={item.urls.small} />
          </IonCol>
          <IonCol size="12">
            <IonText>
              <h3>
                Title : {item.alt_description}
                <br />
                By : {item.user.name} <br />
                Likes : {item.likes}
              </h3>
            </IonText>
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  )
}

export default Image
