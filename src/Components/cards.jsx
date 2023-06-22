import styles from "@styles/cards.module.css";



function Cards (){
  return ( <div className={styles.conteiner}>
              <div className={styles.card}>
                  <img src="Imagenes/camion.png" alt="" width="100px"/>
                  <a href="/despacho">Despacho</a>
              </div>
              <div className={styles.card}>
                  <img src="Imagenes/consulta2.png" alt="" width="100px"  />
                  <a href="/consulta">Consulta</a>
              </div>
              <div className={styles.card}>
                  <img src="Imagenes/plata.png" alt="" width="100px" />
                  <a href="/cobros">Cobros</a>
              </div>
              <div className={styles.card}>
                  <img src="Imagenes/perfil2.png" alt="" width="100px" />
                  <a href="">Perfil</a>
              </div>
            </div>
  )
}
export default Cards;