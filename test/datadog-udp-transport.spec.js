const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const dgram = require('dgram')

chai.use(sinonChai)
chai.should()

const transport = require('../index')

describe("datadog-udp-transport", () => {

    var sandbox
    let sendSpy
    let closeSpy

    beforeEach(() => {
        sandbox = sinon.createSandbox()
        sendStub = sinon.stub().callsArg(5)
        closeSpy = sinon.spy()

        sandbox.stub(dgram, "createSocket").returns(
            {
                send: sendStub,
                close: closeSpy
            }
        )
    })

    afterEach(() => {
        sandbox.restore();
    })

    it("can ship logs with sensible defaults", (done)=> {
        t = new transport({}).log({level: "info", message: "Hello World"}, () => {
            sendStub.should.be.calledOnce
            sendStub.args[0][0].should.deep.equal(Buffer.from("Hello World"))
            sendStub.args[0][3].should.equal(10518)
            sendStub.args[0][4].should.deep.equal("localhost")
            closeSpy.should.be.calledOnce
            done()
        })
    })

    it("can ship logs with custom settings", (done)=> {
        t = new transport({
            host: "10.38.0.1",
            port: 22
        }).log({level: "info", message: "Hello World"}, () => {
            sendStub.should.be.calledOnce
            sendStub.args[0][0].should.deep.equal(Buffer.from("Hello World"))
            sendStub.args[0][3].should.equal(22)
            sendStub.args[0][4].should.deep.equal("10.38.0.1")
            closeSpy.should.be.calledOnce
            done()
        })
    })
})