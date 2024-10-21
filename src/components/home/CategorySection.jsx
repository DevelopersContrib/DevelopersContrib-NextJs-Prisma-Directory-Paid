import {FaTasks} from "react-icons/fa"

const CategorySection = ({categories}) => {
    return (
     <section className="tw-py-12">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <h2 className="tw-font-bold tw-text-3xl mb-3">Browse Categories</h2>
            </div>
            <div className="col-lg-12">
              <div className="row g-3">
                {categories.data.categories.map((category) => (
                <div className="col-xl-3" key={category.category_id}>
                  <a target="_blank" href={`https://www.contrib.com/verticals/news/`+category.slug} className="tw-no-underline tw-flex tw-w-full tw-items-center tw-text-2xl tw-font-medium">
                    <div className="tw-mr-4">
                      <FaTasks className="tw-w-6 tw-h-6 tw-text-blue-400" />
                    </div>
                    <div className="tw-text-[#515151] tw-text-base">
                     {category.category_name}
                    </div>
                  </a>
                </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
}

export default CategorySection