import "./users.css";
import { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import { useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { getUsers } from "../redux/users/user-action";
import { connect } from "react-redux";
import Layout from "../components/layout";
import axios from "axios";

const Users = (props) => {
  const navigator = useNavigate();
  const [show, setShow] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    props.dispatch(getUsers());
    const token = JSON.parse(localStorage.getItem("user-data")).jwtToken;
    console.log(token);
    axios
      .get("https://backend-dev-s.herokuapp.com/accounts", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response)
        if(response.status == 200) {
          setUsers(response.data)
        }
      })
      .catch((error) => {
        navigator("/login");
      });
  }, []);

  const handleClick = (e, id) => {
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/${id}`,
        { block: !e },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("sessionId")}`,
          },
        }
      )
      .then((res) => {})
      .catch((err) => {
        const errMsg = err.response?.data?.message;
      });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-8 min-h-screen">
        <div className="py-8">
          <div>
            <h2 className="text-2xl font-semibold leading-tight">Invoices</h2>
          </div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      S.No
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Joining date
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Blocked
                    </th>
                  </tr>
                  {users.length != 0 && users.map(user => <tr key = {user.id}>
                    
                    <td className="px-5 py-3 border-b-2  text-left text-xs font-semibold uppercase tracking-wider" >
                      {user.id}
                    </td>
                    <td className="px-5 py-3 border-b-2  text-left text-xs font-semibold uppercase tracking-wider">
                      {user.fullName}
                    </td>
                    <td className="px-5 py-3 border-b-2  text-left text-xs font-semibold uppercase tracking-wider">
                      {user.email}
                    </td>
                    <td className="px-5 py-3 border-b-2  text-left text-xs font-semibold uppercase tracking-wider">
                      {user.created}
                    </td>
                    <td className="px-5 py-3 border-b-2  text-center text-xs font-semibold uppercase tracking-wider">
                      {user.isVerified? "true": "false"}
                    </td>
                  </tr>)}
                </thead>
                <tbody>
                  {props.users &&
                    props.users.data &&
                    props.users.data.map((users, index) => {
                      return (
                        <tr>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {index + 1}
                            </p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {users.fullName}
                            </p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {users.email}
                            </p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {users.created}
                            </p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
                            <div className="flex items-center justify-center w-full mb-12">
                              <label
                                for={`toggleB${index}`}
                                className="flex items-center cursor-pointer"
                              >
                                <div className="relative">
                                  <input
                                    type="checkbox"
                                    id={`toggleB${index}`}
                                    className="sr-only"
                                    checked={users.block}
                                    onClick={(e) =>
                                      handleClick(users.block, users.id)
                                    }
                                  />
                                  <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
                                  <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
                                </div>
                              </label>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.users,
  };
};
export default connect(mapStateToProps)(Users);
