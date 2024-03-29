import jwtDecode from "jwt-decode";
import Link from "next/link";
import { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import io from 'socket.io-client';
import { Header, Sidebar } from "../../../components";
import { DestroyUser, GetUserData } from "../../../services/dashboard";
import { JWTPayloadTypes, UserStateEditTypes, UserStateTypes } from "../../../services/data-types";
import { CSVLink } from "react-csv";

interface UserDataStateTypes {
  user: UserStateTypes;
}

const host: any = process.env.NEXT_PUBLIC_SOCKET;
const socket = io(host);

export default function User(props: UserDataStateTypes) {
  const { user } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [toggleViewMode, setToggleViewMode] = useState(false);
  const toggleNavbar = () => {
    setToggleViewMode(!toggleViewMode);
  };
  const [items, setItems] = useState([]);
  const [pageCount, setpageCount] = useState(0);
  const [totalData, setTotalData] = useState(0);

  let limit = 5;

  const getDataUser = async () => {
    setIsLoading(true);

    const data: any = await GetUserData(1, limit);
    const dataUsers = data.data.data
    setIsLoading(false);

    setTotalData(data.data.total)
    setpageCount(Math.ceil(data.data.total / limit));
    setItems(dataUsers);

  };

  useEffect(() => {
    socket.on('dataMessaage', (data) => {
      if (data.userId === user.id) {
        toast.error(`Nilai : ${data.data.nilai} | ${data.data.message}!!!!!!!`, {
          theme: "colored",
        });
      }
    });
    getDataUser();
  }, [limit]);

  const fetchComments = async (currentPage: any) => {
    const data: any = await GetUserData(currentPage, limit);
    return data.data.data;

  };

  const handlePageClick = async (data: any) => {
    let currentPage = data.selected + 1;
    const commentsFormServer = await fetchComments(currentPage);
    setItems(commentsFormServer);
  };

  const filterBySearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    const data: any = await GetUserData(1, Infinity);

    let updatedList: any = [...data.data.data];

    updatedList = updatedList.filter((item: any) => {
      return (
        item.name.toString().toLowerCase().indexOf(query.toLowerCase()) !==
        -1
      );
    });
    setItems(updatedList);
  };

  const deleteUser = async (id: string) => {
    DestroyUser(id);
    toast.error("Berhasil menghapus data pengguna");

    const data: any = await GetUserData(1, limit);
    const dataUsers = data.data.data

    setTotalData(data.data.total)
    setpageCount(Math.ceil(data.data.total / limit));
    setItems(dataUsers);
  };

  const notifyDownload = () => toast.success("Berhasil download data pengguna aplikasi");

  return (
    <>
      {/* Navbar */}
      <div className="dashboard d-flex">
        {
          user.status == "admin" ? <Sidebar
            toggleViewMode={toggleViewMode}
            toggleNavbar={toggleNavbar}
            activeMenu="Pengguna"
            statusAdmin
          /> : <Sidebar
            toggleViewMode={toggleViewMode}
            toggleNavbar={toggleNavbar}
            activeMenu="Pengguna"
          />
        }
        {/* Main Content */}
        <div className="content">
          <Header toggleNavbar={toggleNavbar} filterBySearch={filterBySearch} isFilter imageProfile={user.avatar} placeHolder="Cari Nama Pengguna Aplikasi" />
          {/* <input id="search-box" onChange={filterBySearch} /> */}
          <section className="px-3">
            <div className="header justify-between flex-row items-center">
              <div className="">
                <h3 className="text-3xl text-black font-bold">Pengguna</h3>
                <p className=" text-base text-grey2 mt-1">Kelola data tanaman sebaik mungkin</p>
              </div>
              <h3 className="text-base text-grey2 mt-1">Total : {totalData}</h3>
            </div>

          </section>
          <section className="mt-8 mb-10">
            <div className="container-fluid lg:flex lg:justify-between flex-none justify-start">

              <Link href="/dashboard/pengguna/tambah" legacyBehavior>
                <div className="btn bg-primary1 border-0 text-white rounded-full lg:inline block px-5">Tambah Pengguna</div>
              </Link>
              <div className="lg:flex">
                <CSVLink
                  data={items}
                  className="btn bg-primary1 border-0 text-white rounded-full px-5 lg:inline block lg:mr-4 mr-0"
                  filename={"Users-data.csv"}
                  onClick={notifyDownload}
                >
                  Download File CSV
                </CSVLink>
              </div>
            </div>
          </section>

          <div className="m-2">
            {isLoading ? (
              <div className="justify-center mx-auto flex">
                <ReactLoading
                  type="spinningBubbles"
                  color="#174AFF"
                  height={667}
                  width={375}
                />
              </div>
            ) : (
              <div className="table-responsive-lg">
                <table className="table table-borderless table-data">
                  <thead>
                    <tr>
                      <th scope="col">No</th>
                      <th scope="col">Email</th>
                      <th scope="col">Name</th>
                      <th scope="col">Username</th>
                      <th scope="col">Status</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>

                  <tbody>

                    {items.map((item: UserStateEditTypes) => (

                      <tr key={item._id} className="align-items-center">
                        <td>{item.no} </td>
                        <td>{item.email}</td>
                        <td>{item.name}</td>
                        <td>{item.username}</td>
                        <td>{item.status}</td>
                        <td>
                          <Link href={`/dashboard/pengguna/edit/${item._id}`} legacyBehavior  >
                            <a className="btn-edit-user">Edit</a>
                          </Link>

                          <button
                            onClick={() => deleteUser(item._id)}
                            className="btn-delete-user"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>

                    ))}
                  </tbody>
                </table>
              </div>
            )}
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
  if (userFromPayload.status !== "admin") {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    };
  }
  const IMG = process.env.NEXT_PUBLIC_IMG;
  userFromPayload.avatar = `${IMG}/${userFromPayload.avatar}`;
  return {
    props: {
      user: userFromPayload,
    },
  };
}
