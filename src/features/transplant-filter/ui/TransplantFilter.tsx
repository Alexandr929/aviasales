import styles from './TransplantFilter.module.scss'

interface TransplantFilterProps {
  numberStops: number[]
  onChange: (stops: number[]) => void
}

export const TransplantFilter = ({ numberStops, onChange }: TransplantFilterProps) => {
  const options = [
    { value: 'all', label: 'Все', stops: [0, 1, 2, 3] },
    { value: 0, label: 'Без пересадок', stops: [0] },
    { value: 1, label: '1 пересадка', stops: [1] },
    { value: 2, label: '2 пересадки', stops: [2] },
    { value: 3, label: '3 пересадки', stops: [3] },
  ]

  const handleChangeCheckboxs = (value: number | string) => {
    if (value === 'all') {
      onChange(numberStops.length === 4 ? [] : [0, 1, 2, 3])
      return
    }

    const numberValue = value as number

    let newNumberStops: number[]

    const setNumbers = new Set(numberStops)

    if (setNumbers.has(numberValue)) {
      newNumberStops = numberStops.filter((number) => number !== numberValue)
    } else {
      newNumberStops = [...numberStops, numberValue]
    }

    if (newNumberStops.length === 4) {
      onChange([0, 1, 2, 3])
      return
    }

    onChange(newNumberStops)
  }

  return (
    <div className={styles.transplantFilter}>
      <h3 className={styles.header}>количество пересадок</h3>

      {options.map((option) => (
        <label key={option.value} className={styles.label}>
          <input
            type="checkbox"
            checked={
              option.value === 'all'
                ? numberStops.length === 4
                : numberStops.includes(option.value as number)
            }
            onChange={() => handleChangeCheckboxs(option.value)}
            className={styles.transplantInput}
          />

          <span className={styles.transplantInputVariants}>{option.label}</span>
        </label>
      ))}
    </div>
  )
}
