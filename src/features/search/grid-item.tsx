import clsx from 'clsx'
import { FC } from 'react'
import LikeButton from '../../components/like-button'
import { Result } from './definition'

const GridItem: FC<Result> = (item) => {
  return (
    <div
      className={clsx(
        'relative flex flex-col p-2 text-invert ',
        'h-[240px] bg-cover bg-center cursor-pointer hover:border-2 hover:border-lime-500'
      )}
      style={{
        backgroundImage: `url(${item.urls.small})`,
        backgroundSize: 'cover',
        display: 'block',
      }}
      key={item.id}
    >
      <div
        className={clsx(
          'absolute xs:hidden right-2 bottom-3 bg-slate-100 text-slate-900 rounded-md py-1 px-2'
        )}
      >
        <LikeButton count={item.likes} />
      </div>
      <div className="absolute max-w-[60%] bottom-3 px-4 overflow-visible rounded-md ml-2 flex flex-row items-center bg-slate-100 text-slate-900 h-[32px] space-x-2">
        <img
          title={item.user.name}
          className="rounded-full w-[48px] h-[48px] -ml-6 border-2 border-slate-100"
          src={item.user.profile_image.medium}
          alt="profile"
        />
        <p className="truncate">{item.user.name}</p>
      </div>
    </div>
  )
}

export default GridItem
