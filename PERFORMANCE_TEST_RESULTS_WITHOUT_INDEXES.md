```
            .-/+oossssoo+/-.
        `:+ssssssssssssssssss+:`
      -+ssssssssssssssssssyyssss+-
    .ossssssssssssssssssdMMMNysssso.       simone@simone
   /ssssssssssshdmmNNmmyNMMMMhssssss/      -------------
  +ssssssssshmydMMMMMMMNddddyssssssss+     OS: Ubuntu 24.04 LTS x86_64
 /sssssssshNMMMyhhyyyyhmNMMMNhssssssss/    Host: GL502VT 1.0
.ssssssssdMMMNhsssssssssshNMMMdssssssss.   Kernel: 6.8.0-38-generic
+sssshhhyNMMNyssssssssssssyNMMMysssssss+   Uptime:
ossyNMMMNyMMhsssssssssssssshmmmhssssssso   Packages:
ossyNMMMNyMMhsssssssssssssshmmmhssssssso   Shell: bash 5.2.21
+sssshhhyNMMNyssssssssssssyNMMMysssssss+   Resolution: 1920x1080, 1920x1080
.ssssssssdMMMNhsssssssssshNMMMdssssssss.   DE: Unity
 /sssssssshNMMMyhhyyyyhdNMMMNhssssssss/    WM: Mutter
  +sssssssssdmydMMMMMMMMddddyssssssss+     WM Theme: Adwaita
   /ssssssssssshdmNNNNmyNMMMMhssssss/      Theme: Yaru-dark [GTK2/3]
    .ossssssssssssssssssdMMMNysssso.       Icons: Yaru [GTK2/3]
      -+sssssssssssssssssyyyssss+-         Terminal: vscode
        `:+ssssssssssssssssss+:`           CPU: Intel i5-6300HQ (4) @ 3.200GHz
            .-/+oossssoo+/-.               GPU: NVIDIA GeForce GTX 960 OEM / 970M
                                           GPU: Intel HD Graphics 530
                                           Memory: 9631MiB / 15854MiB
```

```

          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

     execution: local
        script: add_question.js
        output: -

     scenarios: (100.00%) 1 scenario, 5 max VUs, 40s max duration (incl. graceful stop):
              * default: 5 looping VUs for 10s (gracefulStop: 30s)


     data_received..................: 339 kB 34 kB/s
     data_sent......................: 152 kB 15 kB/s
     http_req_blocked...............: avg=12.48µs  p(99)=28.9µs
     http_req_connecting............: avg=6µs      p(99)=0s
     http_req_duration..............: avg=73.32ms  p(99)=460.53ms
       { expected_response:true }...: avg=73.32ms  p(99)=460.53ms
     http_req_failed................: 0.00%  ✓ 0         ✗ 680
     http_req_receiving.............: avg=136.01µs p(99)=664.24µs
     http_req_sending...............: avg=48.38µs  p(99)=446.85µs
     http_req_tls_handshaking.......: avg=0s       p(99)=0s
     http_req_waiting...............: avg=73.14ms  p(99)=460.2ms
     http_reqs......................: 680    67.700042/s
     iteration_duration.............: avg=73.68ms  p(99)=461.56ms
     iterations.....................: 680    67.700042/s
     vus............................: 5      min=5       max=5
     vus_max........................: 5      min=5       max=5


running (10.0s), 0/5 VUs, 680 complete and 0 interrupted iterations
default ✓ [======================================] 5 VUs  10s

          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

     execution: local
        script: add_answer.js
        output: -

     scenarios: (100.00%) 1 scenario, 5 max VUs, 40s max duration (incl. graceful stop):
              * default: 5 looping VUs for 10s (gracefulStop: 30s)


     data_received..................: 125 kB 12 kB/s
     data_sent......................: 52 kB  5.1 kB/s
     http_req_blocked...............: avg=27.99µs  p(99)=1.07ms
     http_req_connecting............: avg=12.03µs  p(99)=426.48µs
     http_req_duration..............: avg=187.85ms p(99)=541.11ms
       { expected_response:true }...: avg=187.85ms p(99)=541.11ms
     http_req_failed................: 0.00%  ✓ 0         ✗ 268
     http_req_receiving.............: avg=168.87µs p(99)=792.06µs
     http_req_sending...............: avg=47.44µs  p(99)=317.71µs
     http_req_tls_handshaking.......: avg=0s       p(99)=0s
     http_req_waiting...............: avg=187.64ms p(99)=540.61ms
     http_reqs......................: 268    26.475525/s
     iteration_duration.............: avg=188.26ms p(99)=543.02ms
     iterations.....................: 268    26.475525/s
     vus............................: 5      min=5       max=5
     vus_max........................: 5      min=5       max=5


running (10.1s), 0/5 VUs, 268 complete and 0 interrupted iterations
default ✓ [======================================] 5 VUs  10s

          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

     execution: local
        script: add_vote.js
        output: -

     scenarios: (100.00%) 1 scenario, 5 max VUs, 40s max duration (incl. graceful stop):
              * default: 5 looping VUs for 10s (gracefulStop: 30s)


     data_received..................: 102 kB 10 kB/s
     data_sent......................: 81 kB  8.1 kB/s
     http_req_blocked...............: avg=26.94µs  p(99)=452.69µs
     http_req_connecting............: avg=14.51µs  p(99)=200.87µs
     http_req_duration..............: avg=114ms    p(99)=213.53ms
       { expected_response:true }...: avg=114ms    p(99)=213.53ms
     http_req_failed................: 0.00%  ✓ 0         ✗ 439
     http_req_receiving.............: avg=118.46µs p(99)=694.95µs
     http_req_sending...............: avg=29.87µs  p(99)=176.82µs
     http_req_tls_handshaking.......: avg=0s       p(99)=0s
     http_req_waiting...............: avg=113.85ms p(99)=213.42ms
     http_reqs......................: 439    43.615973/s
     iteration_duration.............: avg=114.28ms p(99)=213.77ms
     iterations.....................: 439    43.615973/s
     vus............................: 5      min=5       max=5
     vus_max........................: 5      min=5       max=5


running (10.1s), 0/5 VUs, 439 complete and 0 interrupted iterations
default ✓ [======================================] 5 VUs  10s

          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

     execution: local
        script: open_course_page.js
        output: -

     scenarios: (100.00%) 1 scenario, 5 max VUs, 40s max duration (incl. graceful stop):
              * default: 5 looping VUs for 10s (gracefulStop: 30s)


     data_received..................: 21 MB  2.1 MB/s
     data_sent......................: 868 kB 87 kB/s
     http_req_blocked...............: avg=10µs     p(99)=33.08µs
     http_req_connecting............: avg=586ns    p(99)=0s
     http_req_duration..............: avg=6.95ms   p(99)=19.72ms
       { expected_response:true }...: avg=6.95ms   p(99)=19.72ms
     http_req_failed................: 0.00%  ✓ 0          ✗ 6944
     http_req_receiving.............: avg=196.62µs p(99)=2.64ms
     http_req_sending...............: avg=48.53µs  p(99)=880.86µs
     http_req_tls_handshaking.......: avg=0s       p(99)=0s
     http_req_waiting...............: avg=6.71ms   p(99)=18.49ms
     http_reqs......................: 6944   693.474646/s
     iteration_duration.............: avg=14.36ms  p(99)=33.26ms
     iterations.....................: 3472   346.737323/s
     vus............................: 5      min=5        max=5
     vus_max........................: 5      min=5        max=5


running (10.0s), 0/5 VUs, 3472 complete and 0 interrupted iterations
default ✓ [======================================] 5 VUs  10s

          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

     execution: local
        script: open_question_page.js
        output: -

     scenarios: (100.00%) 1 scenario, 5 max VUs, 40s max duration (incl. graceful stop):
              * default: 5 looping VUs for 10s (gracefulStop: 30s)


     data_received..................: 17 MB  1.7 MB/s
     data_sent......................: 953 kB 95 kB/s
     http_req_blocked...............: avg=12.31µs  p(99)=101.74µs
     http_req_connecting............: avg=1.3µs    p(99)=0s
     http_req_duration..............: avg=7.61ms   p(99)=18.16ms
       { expected_response:true }...: avg=7.61ms   p(99)=18.16ms
     http_req_failed................: 0.00%  ✓ 0          ✗ 6332
     http_req_receiving.............: avg=203.26µs p(99)=2.7ms
     http_req_sending...............: avg=47.73µs  p(99)=936.73µs
     http_req_tls_handshaking.......: avg=0s       p(99)=0s
     http_req_waiting...............: avg=7.36ms   p(99)=17.55ms
     http_reqs......................: 6332   632.690604/s
     iteration_duration.............: avg=15.74ms  p(99)=30.79ms
     iterations.....................: 3166   316.345302/s
     vus............................: 5      min=5        max=5
     vus_max........................: 5      min=5        max=5


running (10.0s), 0/5 VUs, 3166 complete and 0 interrupted iterations
default ✓ [======================================] 5 VUs  10s
```
