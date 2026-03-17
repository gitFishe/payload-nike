
export const SearchBar = ({additionalClasses} : any)=> {




  return (
    <div className={`${additionalClasses}`}>
      <form className="h-9 bg-[#f5f5f5] rounded-3xl flex w-42 pr-1">
        <button
          className="rounded-full w-9 h-9 hover:bg-gray-300 flex items-center justify-center shrink-0 mr-1 cursor-pointer "
        >
          <img src="/icon/search-icon.svg" />
        </button>
        <div className="w-auto">
          <input
            placeholder="Search"
            className="placeholder:text-[#707483] text-black w-full h-full focus:outline-none focus:ring-0 focus:border-transparent"
          />
        </div>
      </form>
    </div>
  )
}