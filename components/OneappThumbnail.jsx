import Image from "next/image";
import styles from "./OneappThumbnail.module.css";

export default function OneappThumbnail({ priority, loading, fetchPriority }) {
  return <div className={styles.thumbnail}>
    <Image src="/assets/selected-works/oneapp-dashboard.png" width={4096} height={3385} alt="OneApp real estate dashboard" className={styles.dashboard} priority={priority} loading={loading} fetchPriority={fetchPriority} quality={95} sizes="(max-width: 767px) 80vw, 540px" />
    <div className={styles.phone}>
      <Image src="/assets/selected-works/oneapp-marketplace.png" width={404} height={448} alt="OneApp mobile property marketplace" className={styles.screen} priority={priority} loading={loading} quality={100} unoptimized />
    </div>
  </div>;
}
