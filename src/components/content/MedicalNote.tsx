import styles from './MedicalNote.module.css'

export function MedicalNote() {
  return (
    <p className={styles.note}>
      Informasi di halaman ini bersifat umum. Angka waktu dan pemulihan adalah kisaran yang lazim
      dan dapat berbeda pada tiap pasien. Keputusan tindakan ditentukan setelah pemeriksaan
      langsung.
    </p>
  )
}
