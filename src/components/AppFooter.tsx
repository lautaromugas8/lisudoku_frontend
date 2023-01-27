import { Link } from 'react-router-dom'
import { useSelector } from 'src/hooks'
import { ACTIVE_VARIANTS, SudokuVariantDisplay } from 'src/utils/constants'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiscord } from '@fortawesome/free-brands-svg-icons'

const AppFooter = ({ admin }: { admin: boolean }) => {
  const difficulty = useSelector(state => state.userData.difficulty)

  return (
    <footer className="flex flex-col gap-3 pt-2 pb-5 justify-center items-center">
      {!admin && (
        <>
          <div className="flex flex-wrap w-full md:w-3/4 text-medium justify-start">
            {ACTIVE_VARIANTS.map((variant, index) => (
              <Link key={index} to={`/play/${variant}/${difficulty}`} className="w-full sm:w-1/3 text-center">
                Play {SudokuVariantDisplay[variant]} Sudoku
              </Link>
            ))}
          </div>
          <div className="flex align-middle gap-3">
            <Link to="/about">About</Link>
            |
            <a href="https://discord.gg/SGV8TQVSeT"
               target="_blank"
               rel="noopener noreferrer">
              <FontAwesomeIcon icon={faDiscord} size="1x" color="#7d87fe" />
            </a>
          </div>
        </>
      )}
    </footer>
  )
}

export default AppFooter
