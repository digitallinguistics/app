/**
 * Unit tests for EventEmitter
 */

import chai         from 'chai';
import EventEmitter from './EventEmitter.js';
import sinon        from 'sinon';
import sinonChai    from 'sinon-chai';

chai.use(sinonChai);

const { expect } = chai;

describe(`EventEmitter`, function() {

  it(`emit`, async function() {

    const emitter = new EventEmitter;
    const stub    = sinon.stub();

    emitter.on(`test`, stub);
    await emitter.emit(`test`);

    expect(stub).to.have.been.calledOnce;

  });

  it(`off`, async function() {

    const emitter = new EventEmitter;
    const stub    = sinon.stub();

    emitter.on(`test`, stub);
    emitter.off(`test`, stub);
    await emitter.emit(`test`);

    expect(stub).not.to.have.been.called;

  });

  it(`on`, async function() {

    const emitter = new EventEmitter;
    const stub = sinon.stub();

    emitter.on(`test`, stub);
    await emitter.emit(`test`);

    expect(stub).to.have.been.calledOnce;

  });

  it(`once`, async function() {
    const emitter = new EventEmitter;
    const stub = sinon.stub();

    emitter.once(`test`, stub);
    await emitter.emit(`test`);
    expect(stub).to.have.been.calledOnce;

    await emitter.emit(`test`);
    expect(stub).to.have.been.calledOnce;

  });

  it(`remove`, async function() {

    const emitter = new EventEmitter;
    const stub    = sinon.stub();
    const remove  = emitter.on(`test`, stub);

    await emitter.emit(`test`);
    expect(stub).to.have.been.calledOnce;

    remove();

    await emitter.emit(`test`);
    expect(stub).to.have.been.calledOnce;

  });

});
