
import jwtDecode from "jwt-decode";
import Link from "next/link";
import { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import io from 'socket.io-client';
import { Header, Sidebar } from "../../../components";
import { DestroySetting, getAllDataSetting } from "../../../services/dashboard";
import { JWTPayloadTypes, SettingsDataTypes, UserStateTypes } from "../../../services/data-types";

interface UserDataStateTypes {
  user: UserStateTypes;
}

const host : any = process.env.NEXT_PUBLIC_SOCKET;
const socket = io(host);

export default function Setting(props: UserDataStateTypes) {
  const { user } = props;

  const [isLoading, setIsLoading] = useState(false);

  const [toggleViewMode, setToggleViewMode] = useState(false);
  const toggleNavbar = () => {
    setToggleViewMode(!toggleViewMode);
  };
  const [items, setItems] = useState([]);
  const [totalData, setTotalData] = useState(0);

  const [pageCount, setpageCount] = useState(0);


  let limit = 1;

  const getContent = async () => {
    setIsLoading(true);
    const data = await getAllDataSetting(1, limit);
    const dataSettings = data.data.data

    setIsLoading(false);
    setTotalData(data.data.total)
    setpageCount(Math.ceil(data.data.total / limit));
    setItems(dataSettings);
  };

  useEffect(() => {
    socket.on('dataMessaage', (data) => {
      toast.error(`Nilai : ${data.nilai} | ${data.message}!!!!!!!`,{
        theme: "colored",
      });

    });
    getContent();
  }, [limit]);


  const fetchComments = async (currentPage: any, limit: number) => {
    const data: any = await getAllDataSetting(currentPage, limit);

    return data.data.data;
  };

  const handlePageClick = async (data: any) => {
    let currentPage = data.selected + 1;
    const commentsFormServer = await fetchComments(currentPage, limit);
    setItems(commentsFormServer);
  };

  const filterBySearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    const data: any = await getAllDataSetting(1, Infinity);
    let updatedList: any = [...data.data.data];

    updatedList = updatedList.filter((item: any) => {
      return (
        item.nameVegetable.toString().toLowerCase().indexOf(query.toLowerCase()) !==
        -1
      );
    });
    setItems(updatedList);
  };

  const deleteSetting = async (id: string) => {
    DestroySetting(id);
    const user = await getAllDataSetting(1, limit);
    setItems(user.data.data);
  };
  return (
    <>
      {/* Navbar */}
      <div className="dashboard d-flex">
        {
          user.status == "admin" ? <Sidebar
            toggleViewMode={toggleViewMode}
            toggleNavbar={toggleNavbar}
            activeMenu="Pengaturan"
            statusAdmin
          /> : <Sidebar
            toggleViewMode={toggleViewMode}
            toggleNavbar={toggleNavbar}
            activeMenu="Pengaturan"
          />
        }
        {/* Main Content */}
        <div className="content">
          <Header toggleNavbar={toggleNavbar} filterBySearch={filterBySearch} isFilter imageProfile = {user.avatar} />
          {/* <input id="search-box" onChange={filterBySearch} /> */}
          <section className="px-3">
          <div className="header justify-between flex-row items-center">
              <div className="">
                <h3 className="text-3xl text-black font-bold">Pengaturan</h3>
                <p className=" text-base text-grey2 mt-1">Kelola data tanaman sebaik mungkin</p>
              </div>
              <h3 className="text-base text-grey2 mt-1">Total : {totalData}</h3>
            </div>
          </section>
          <section className="mt-8 mb-10">
            <div className="container-fluid lg:flex lg:justify-between flex-none justify-start">

              <Link href="/dashboard/pengaturan/tambah" legacyBehavior>
                <div className="btn bg-primary1 border-0 text-white rounded-full lg:inline block px-5">Tambah Sayuran</div>
              </Link>
              <div className="lg:flex">
                <Link href="/dashboard/user/add-user" legacyBehavior>
                  <div className="btn bg-primary1 border-0 text-white lg:mr-4 mr-0 lg:my-0 my-3 rounded-full px-5 lg:inline block">File CSV (Data Enkripsi)</div>
                </Link>
                <Link href="/dashboard/user/add-user" legacyBehavior>
                  <div className="btn bg-primary1 border-0 text-white rounded-full px-5 lg:inline block">File CSV (Data Asli)</div>
                </Link>
              </div>
            </div>
          </section>

          <div className="m-2">
            {isLoading ? (
              <ReactLoading
                type="spinningBubbles"
                color="#174AFF"
                height={667}
                width={375}
              // className="justify-content-center text-center"
              />
            ) : (
              <div className="table-responsive-lg">
                
                <table className="table table-borderless table-data">
                  <thead>
                    <tr>
                      <th scope="col">No</th>
                      <th scope="col">Nama Sayuran</th>
                      <th scope="col">Jumlah Sayuran</th>
                      <th scope="col">Jumlah Panen</th>
                      <th scope="col">Aksi</th>

                    </tr>
                  </thead>

                  <tbody>
               
                    {items.map((item: SettingsDataTypes) => {
                      return (
                        <tr key={item._id} className="align-items-center">
                          <td>{item.no}</td>
                          <td>{item.nameVegetable}</td>
                          <td>{item.amountVegetable}</td>
                          <td>{item.amountHarvest}</td>
                          <td>
                            <Link href={`/dashboard/pengaturan/edit/${item._id}`} legacyBehavior>
                              <a className="btn-edit-user">Edit</a>
                            </Link>

                            <button
                              onClick={() => deleteSetting(item._id)}
                              className="btn-delete-user"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
            {/* {items.map((item) => {
            return (
              <div key={item.id} className="col-sm-6 col-md-4 v my-2">
                <div className="card shadow-sm w-100" style={{ minHeight: 225 }}>
                  <div className="card-body">
                    <h5 className="card-title text-center h2">Id :{item.id} </h5>
                    <h6 className="card-subtitle mb-2 text-muted text-center">
                      {item.email}
                    </h6>
                    <p className="card-text">{item.body}</p>
                  </div>
                </div>
              </div>
            );
          })} */}
          </div>

          <ReactPaginate
            previousLabel={"previous"}

            nextLabel={"next"}
            breakLabel={"..."}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName={"pagination justify-content-center"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
            activeClassName={"active"}
          />
        </div>
      </div>
    </>
  );
}


interface GetServerSideProps {
  req: {
    cookies: {
      token: string,
    }
  }
}



export async function getServerSideProps({ req }: GetServerSideProps) {
  const { token } = req.cookies;
  if (!token) {
    return {
      redirect: {
        destination: '/sign-in',
        permanent: false,
      },
    };
  }

  const jwtToken = Buffer.from(token, 'base64').toString('ascii');
  const payload: JWTPayloadTypes = jwtDecode(jwtToken);

  const userFromPayload = payload.user;
  const IMG = process.env.NEXT_PUBLIC_IMG;
  userFromPayload.avatar = `${IMG}/${userFromPayload.avatar}`;
  return {
    props: {
      user: userFromPayload,
    },
  };
}

