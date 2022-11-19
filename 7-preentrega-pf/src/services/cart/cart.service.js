const { json } = require('express');
const fs = require('fs');

class Carrito {
    constructor() { }

    async createCarrito(data) {
        try {
            const carrito = await fs.promises.readFile(__dirname + '/carrito.json');
            const carritoParse = JSON.parse(carrito);
            data.timestamp = Date.now() / 1000;
            data.products = [];
            carritoParse.push(data);
            await fs.promises.writeFile(__dirname + '/carrito.json', JSON.stringify(carritoParse, null, 2));
            return {
                success: true,
                data: data.id
            }

        } catch (err) {
            console.error(err);
            return {
                success: false,
                message: err.message
            }
        }
    }

    async getCarritos() {
        try {
            const data = await fs.promises.readFile(__dirname + '/carrito.json');
            return {
                success: true,
                data: JSON.parse(data)
            }
        } catch (err) {
            console.error(err);
            return {
                success: false,
                message: err.message
            }
        }
    }

    async getCarrito(uuid) {
        try {
            const carritos = await fs.promises.readFile(__dirname + '/carrito.json');
            const carritoParse = JSON.parse(carritos);
            const carrito = carritoParse.filter(i => i.id == uuid);
            return {
                success: true,
                data: carrito[0].products
            }
        } catch (err) {
            console.error(err);
            return {
                success: false,
                message: err.message
            }
        }

    }

    async updateCarrito(uuid, data) {
        try {
            const carritos = await this.getCarritos();
            const newList = await carritos.data.map(i => {
                if (i.id == uuid) {
                    return {
                        products: data.products,
                        id: data.id,
                        timestamp: data.timestamp

                    }
                }
                return i;
            });
            await fs.promises.writeFile(__dirname + '/carrito.json', JSON.stringify(newList, null, 2));
            return {
                success: true,
                data: `Carrito ${uuid} modificado exitosamente`
            }
        } catch (err) {
            console.error(err);
            return {
                success: false,
                message: err.message
            }
        }
    }

    async deleteCarrito(uuid) {
        try {
            const carritos = await fs.promises.readFile(__dirname + '/carrito.json');
            const carritoParse = JSON.parse(carritos);
            const newCarritos = carritoParse.filter(i => i.id != uuid);
            await fs.promises.writeFile(__dirname + '/carrito.json', JSON.stringify(newCarritos, null, 2));
            return {
                success: true,
                data: `Carrito ${uuid} borrado  exitosamente`
            }
        } catch (err) {
            console.error(err);
            return {
                success: false,
                message: err.message
            }
        }
    }
}

module.exports = Carrito;