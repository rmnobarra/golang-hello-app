import http from 'k6/http';
import { check, sleep } from 'k6';
import { Trend } from 'k6/metrics';

let latency = new Trend('latency');

export let options = {
    vus: 50,  // 10 usuários virtuais
    duration: '30s',  // por 30 segundos
};

export default function() {
    let res = http.get('http://191.232.186.158:8080/?name=Teste');
    check(res, {
        'status was 200': (r) => r.status == 200,
        'response body': (r) => r.body.indexOf('Hello, Test') !== -1,
    });
    latency.add(res.timings.duration);
    sleep(1);
}