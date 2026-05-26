import styles from './SortTabs.module.scss'

type SortTabsProps = {
  sortBy: 'price' | 'duration'
  onChange: (value: 'price' | 'duration') => void
}

export const SortTabs = ({ onChange, sortBy }: SortTabsProps) => {
  return (
    <div className={styles.sortTabs}>
      <button
        onClick={() => onChange('price')}
        className={`${styles.buttonPrice} ${sortBy === 'price' ? styles.active : ''}`}
      >
        <span className={`${styles.cheap} ${sortBy === 'price' ? styles.active : ''}`}>
          САМЫЙ ДЕШЕВЫЙ
        </span>
      </button>
      <button
        onClick={() => onChange('duration')}
        className={`${styles.buttonDuration} ${sortBy === 'duration' ? styles.active : ''}`}
      >
        <span className={`${styles.fast} ${sortBy === 'duration' ? styles.active : ''}`}>
          САМЫЙ БЫСТРЫЙ
        </span>
      </button>
    </div>
  )
}
