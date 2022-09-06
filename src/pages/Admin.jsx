import React, { useEffect, useState } from "react";
import { traer, eliminar, actualizar } from "../helpers/fetchAdmin";
import "../styles/admin.css";
import NavAdmin from "../componets/NavAdmin";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";

const Administrador = () => {

  const [productos, setProductos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [pedidos, setPedidos] = useState([]);

  // estado Modal crear menus

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // estado Modal actualizar menus
  const [showPut, setShowPut] = useState(false);
  const handlePutClose = () => setShow(false);
  const handlePutShow= () => setShow(true);

  

  // estado Modal Crear Usuarios
  const [showUsersPost, setShowUsersPost] = useState(false);

  const handleUsersPostClose = () => setShowUsersPost(false);
  const handleUsersPostShow = () => setShowUsersPost(true);
  // estado para guardar datos
  const [productoSeleccionado, setProductoSeleccionado] = useState({
    img: "",
    nombre: "",
    detalle: "",
    precio: "",
    disponible: "",
  });


  /* Traer datos */

  const recibirData = async () => {
    // menus
    const datosMenu = await traer("menus?limite=0&desde=0");
    const dataMenu = datosMenu.data.menus;
    setProductos(dataMenu);
    // usuarios
    const datosUsuarios = await traer("usuarios?limite=0&desde=0");
    const dataUsuarios = datosUsuarios.data.usuarios;
    setUsuarios(dataUsuarios);
    // pedidos
    const datosPedidos = await traer("pedidos?limite=0&desde=0");
    const dataPedidos = datosPedidos.data.pedidos;

    setPedidos(dataPedidos);
  };

  /* Actualizar Menus */
  const abrirCerrarModalEditar=()=>{
    setShowPut(!showPut)
  }

    const actualizarDatos = (datos)=>{
      setProductoSeleccionado(datos);
        abrirCerrarModalEditar()   
    }
    const handleChange=(e)=>{ const {name, value}=e.target; setProductoSeleccionado(prevState=>({ ...prevState, [name]: value }))
    console.log(productoSeleccionado); }

    // actualizar(menPut, 'menus')


  // funcion para inactivar menus

  const menusDelete = (e) => {
    const menDelete = e.target.id;
    eliminar("menus", menDelete);
  };

  useEffect(() => {
    setTimeout(() => {
      recibirData();
    }, 2000);
  }, []);
  // function para entregar pedido
  const pedidoListo = (e) => {
    let pedidoPut = e.target.id;
    actualizar(pedidoPut, "pedidos");

    console.log(pedidoPut);
  };
  return (
    <>
            {/* inicio de la tabla menus */}
      <NavAdmin />
      <div className="table-responsive-lg">
        <h1 className="titulo__seccion text-light text-center" id="menus">
          Menus
        </h1>
        {productos.length > 0 ? (
          <Table striped bordered hover variant="dark" className="w-75">
            <thead>
              <tr>
                <th>Id</th>
                <th>img</th>
                <th>Nombre</th>
                <th>Detalle</th>
                <th>Precio</th>
                <th>Activo</th>
                <th>
                  <button
                    className="btn btn-success m-0 w-100"
                    onClick={handleShow}
                  >
                    Crear
                  </button>
                </th>
              </tr>
            </thead>

            <tbody>
              {productos.map((producto) => (
                <>
                  <tr key={producto._id}>
                    <th className="intro-celda"
                    >
                      {producto._id}
                    </th>
                    <th>
                      <img className="intro-img" src={producto.img} />
                    </th>
                    <th className="intro-celda">{producto.nombre}</th>
                    <th className="intro-celda">{producto.detalle}</th>
                    <th className="intro-celda">${producto.precio}</th>
                    <th className="intro-celda">
                      {producto.disponible ? "disponible" : "NO disponible"}
                    </th>
                    <th>
                      <button

                        onClick={()=> actualizarDatos(producto)}
                        className="btn btn-primary "
                      >
                        actualizar
                      </button>
                      <button onClick={menusDelete} className="btn btn-danger">
                        eliminar
                      </button>
                    </th>
                  </tr>
                </>
              ))}
            </tbody>
          </Table>
        ) : (
          <div className="text-center m-5">
            <Spinner animation="border" variant="light" />
          </div>
        )}
        {/* fin de la tabla menus */}
      </div>
      {/* inicio tabla usuarios */}
      <div className="table-responsive-lg">
        <h1 className="titulo__seccion text-light text-center" id="usuarios">
          Usuarios
        </h1>
        {usuarios.length > 0 ? (
          <Table striped bordered hover variant="dark" className="w-75">
            <thead>
              <tr>
                <th>Id</th>
                <th>Nombre</th>
                <th>correo</th>
                <th>Rol</th>
                <th>
                  <button
                    className="btn btn-success m-0 w-100"
                    onClick={handleUsersPostShow}
                  >
                    Crear
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario) => (
                <>
                  <tr>
                    <th className="intro-celda">{usuario.userId}</th>
                    <th className="intro-celda">{usuario.nombre}</th>
                    <th className="intro-celda">{usuario.email}</th>
                    <th className="intro-celda">
                      {usuario.role == "USER_ROLE"
                        ? "USUARIO"
                        : "ADMINISTRADOR"}
                    </th>
                    <th>
                      <button
                        id={usuario._id}
                        onClick={menusDelete}
                        className="btn btn-danger"
                      >
                        Inactivar
                      </button>
                    </th>
                  </tr>
                </>
              ))}
            </tbody>
          </Table>
        ) : (
          <div className="text-center m-5">
            <Spinner animation="border" variant="light" />
          </div>
        )}
        {/* fin de la tabla usuarios */}
      </div>
      {/* inicio de tabla pedidos */}
      <div className="table-responsive-lg">
        <h1 className="titulo__seccion text-light text-center" id="pedidos">
          Pedidos
        </h1>
        {pedidos.length > 0 ? (
          <Table striped bordered hover variant="dark" className="w-75">
            <thead>
              <tr>
                <th>fecha</th>
                <th>menu</th>
                <th>precio</th>
                <th>usuario</th>
                <th>id usuario</th>
                <th>entrega</th>
              </tr>
            </thead>
            <tbody>
              {pedidos.map((pedido) => (
                <>
                  <tr>
                    <th className="intro-celda">{Date(pedido.fecha)}</th>
                    <th className="intro-celda">{pedido.menu.nombre}</th>
                    <th className="intro-celda">{pedido.menu.precio}</th>
                    <th className="intro-celda">{pedido.usuario.nombre}</th>
                    <th className="intro-celda">{pedido.usuario.userId}</th>
                    <th className="intro-celda">
                      {pedido.entrega === false ? "Pendiente" : "Entregado"}
                    </th>
                    <th>
                      <button
                        id={pedido._id}
                        onClick={pedidoListo}
                        className="btn btn-danger"
                      >
                        Cambiar
                      </button>
                    </th>
                  </tr>
                </>
              ))}
            </tbody>
          </Table>
        ) : (
          <div className="text-center m-5">
            <Spinner animation="border" variant="light" />
          </div>
        )}
        {/* fin de la tabla usuarios */}
      </div>

      {/* ---------------------------MODALES :-------------------------------- */}

      {/* inicio Modal CREAR Menu */}

      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Crear Menu nuevo</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Imagen</Form.Label>
                <Form.Control
                  type="string"
                  placeholder="ingresar url"
                  autoFocus
                  name="img"
                 value={productoSeleccionado && productoSeleccionado.img}
                />
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="string"
                  maxLength="15"
                  minLength="1"
                  placeholder=" ingresar nombre"
                  autoFocus 
                  name="nombre"
                  value={productoSeleccionado && productoSeleccionado.nombre}
                />
                <Form.Label>Precio</Form.Label>
                <Form.Control
                  type="string"
                  maxLength="6"
                  minLength="1"
                  placeholder="ingresar precio"
                  autoFocus
                  name="precio"
                value={productoSeleccionado && productoSeleccionado.precio}
                />
                <Form.Label className="m-2">Estado</Form.Label>

                <select name="disponible" id="disponible" form="disponible" 
                 value={productoSeleccionado && productoSeleccionado.disponible}>
                  <option value="false">No disponible</option>
                  <option value="true">disponible</option>
                </select>
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Detalle</Form.Label>
                <Form.Control 
                  as="textarea"
                  maxLength="100"
                  minLength="1"
                  rows={3}
                  name="detalle"
      value={productoSeleccionado && productoSeleccionado.detalle}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cerrar
            </Button>
            <Button
              variant="primary"
              onClick={actualizarDatos}
              id={productos._id}
            >
              Guardar
            </Button>
          </Modal.Footer>
        </Modal>
      </> 
      {/* fin Modal CREAR Menu */}

      {/* inicio Modal ACTUALIZAR Menu */}
      <>
        <Modal show={showPut} onHide={handlePutClose}>
          <Modal.Header closeButton>
            <Modal.Title>Actualizar menu</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Imagen</Form.Label>
                <Form.Control
                  
                  type="string"
                  placeholder="ingresar url"
                  autoFocus
                  name="img"
                  value={productoSeleccionado && productoSeleccionado.img}
                  onChange={handleChange} 
                />
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                
                  type="string"
                  maxLength="15"
                  minLength="1"
                  placeholder=" ingresar nombre"
                  autoFocus
                  name="nombre"
                  onChange={handleChange} 
                  value={productoSeleccionado && productoSeleccionado.nombre}
                />
                <Form.Label>Precio</Form.Label>
                <Form.Control
             
                  type="string"
                  maxLength="6"
                  minLength="1"
                  placeholder="ingresar precio"
                  autoFocus
                  name="precio"
                  value={productoSeleccionado && productoSeleccionado.precio}
                  onChange={handleChange} 
                />
                <Form.Label className="m-2">Estado</Form.Label>               
                <select  name="estado" id="estado" form="estado"  onChange={handleChange}  value={productoSeleccionado && productoSeleccionado.estado}>
                  <option value="false">No disponible</option>
                  <option value="true">disponible</option>
                </select>
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Detalle</Form.Label>
                <Form.Control
                 
                  as="textarea"
                  maxLength="100"
                  minLength="1"
                  rows={3}
                  name="detalle"
                  onChange={handleChange} 
                  value={productoSeleccionado && productoSeleccionado.detalle}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handlePutClose}>
              Cerrar
            </Button>
            <Button variant="primary" onClick={()=> actualizar("menus", productoSeleccionado.id, productoSeleccionado)} >
              Guardar
            </Button>
          </Modal.Footer>
        </Modal>
      </>
      {/* fin Modal ACTUALIZAR Menu */}
      {/* inicio Modal CREAR USUARIO */}
       <> 
       <Modal show={showUsersPost} onHide={handleUsersPostClose}>
          <Modal.Header closeButton>
            <Modal.Title>Dar de alta nuevo usuario</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="string"
                  maxLength="15"
                  minLength="1"
                  placeholder=" ingresar nombre"
                  autoFocus
                />
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  maxLength="40"
                  minLength="1"
                  placeholder="ingresar email"
                  autoFocus
                />
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  maxlength="15"
                  minLength="8"
                  placeholder="ingresar contraseña"
                  autoFocus
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleUsersPostClose}>
              Cerrar
            </Button>
            <Button variant="primary" onClick={handleUsersPostClose}>
              Guardar
            </Button>
          </Modal.Footer>
        </Modal>
      </> 
      {/* fin Modal CREAR USUARIO */}
    </>
  );
};

export default Administrador;