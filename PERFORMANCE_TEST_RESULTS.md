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


     data_received..................: 352 kB 35 kB/s
     data_sent......................: 158 kB 16 kB/s
     http_req_blocked...............: avg=19.93µs  p(99)=44.11µs
     http_req_connecting............: avg=10.68µs  p(99)=0s
     http_req_duration..............: avg=70.49ms  p(99)=218.22ms
       { expected_response:true }...: avg=70.49ms  p(99)=218.22ms
     http_req_failed................: 0.00%  ✓ 0         ✗ 706
     http_req_receiving.............: avg=179.34µs p(99)=797.55µs
     http_req_sending...............: avg=56.33µs  p(99)=157.36µs
     http_req_tls_handshaking.......: avg=0s       p(99)=0s
     http_req_waiting...............: avg=70.25ms  p(99)=217.99ms
     http_reqs......................: 706    70.277614/s
     iteration_duration.............: avg=70.97ms  p(99)=218.71ms
     iterations.....................: 706    70.277614/s
     vus............................: 5      min=5       max=5
     vus_max........................: 5      min=5       max=5


running (10.0s), 0/5 VUs, 706 complete and 0 interrupted iterations
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


     data_received..................: 123 kB 12 kB/s
     data_sent......................: 51 kB  5.0 kB/s
     http_req_blocked...............: avg=25.36µs  p(99)=687.61µs
     http_req_connecting............: avg=13.56µs  p(99)=486.27µs
     http_req_duration..............: avg=190.03ms p(99)=867.49ms
       { expected_response:true }...: avg=190.03ms p(99)=867.49ms
     http_req_failed................: 0.00%  ✓ 0         ✗ 264
     http_req_receiving.............: avg=163.18µs p(99)=456.02µs
     http_req_sending...............: avg=61.39µs  p(99)=138.87µs
     http_req_tls_handshaking.......: avg=0s       p(99)=0s
     http_req_waiting...............: avg=189.8ms  p(99)=867.27ms
     http_reqs......................: 264    26.006637/s
     iteration_duration.............: avg=190.52ms p(99)=869.58ms
     iterations.....................: 264    26.006637/s
     vus............................: 5      min=5       max=5
     vus_max........................: 5      min=5       max=5


running (10.2s), 0/5 VUs, 264 complete and 0 interrupted iterations
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


     data_received..................: 104 kB 10 kB/s
     data_sent......................: 82 kB  8.2 kB/s
     http_req_blocked...............: avg=21.29µs  p(99)=227.59µs
     http_req_connecting............: avg=11.32µs  p(99)=144.83µs
     http_req_duration..............: avg=112.16ms p(99)=199.94ms
       { expected_response:true }...: avg=112.16ms p(99)=199.94ms
     http_req_failed................: 0.00%  ✓ 0         ✗ 445
     http_req_receiving.............: avg=173.61µs p(99)=579.19µs
     http_req_sending...............: avg=57.64µs  p(99)=156.99µs
     http_req_tls_handshaking.......: avg=0s       p(99)=0s
     http_req_waiting...............: avg=111.93ms p(99)=199.74ms
     http_reqs......................: 445    44.208076/s
     iteration_duration.............: avg=112.64ms p(99)=200.39ms
     iterations.....................: 445    44.208076/s
     vus............................: 5      min=5       max=5
     vus_max........................: 5      min=5       max=5


running (10.1s), 0/5 VUs, 445 complete and 0 interrupted iterations
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


     data_received..................: 25 MB  2.5 MB/s
     data_sent......................: 1.0 MB 103 kB/s
     http_req_blocked...............: avg=5.88µs  p(99)=32.44µs
     http_req_connecting............: avg=1.06µs  p(99)=0s
     http_req_duration..............: avg=5.96ms  p(99)=18.6ms
       { expected_response:true }...: avg=5.96ms  p(99)=18.6ms
     http_req_failed................: 0.00%  ✓ 0          ✗ 8228
     http_req_receiving.............: avg=90.49µs p(99)=767.15µs
     http_req_sending...............: avg=21.57µs p(99)=271.77µs
     http_req_tls_handshaking.......: avg=0s      p(99)=0s
     http_req_waiting...............: avg=5.85ms  p(99)=18.33ms
     http_reqs......................: 8228   820.835248/s
     iteration_duration.............: avg=12.14ms p(99)=29.32ms
     iterations.....................: 4114   410.417624/s
     vus............................: 5      min=5        max=5
     vus_max........................: 5      min=5        max=5


running (10.0s), 0/5 VUs, 4114 complete and 0 interrupted iterations
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


     data_received..................: 31 MB  3.1 MB/s
     data_sent......................: 1.7 MB 173 kB/s
     http_req_blocked...............: avg=5.68µs  p(99)=35.58µs
     http_req_connecting............: avg=384ns   p(99)=0s
     http_req_duration..............: avg=4.21ms  p(99)=9.95ms
       { expected_response:true }...: avg=4.21ms  p(99)=9.95ms
     http_req_failed................: 0.00%  ✓ 0           ✗ 11502
     http_req_receiving.............: avg=91.1µs  p(99)=699.34µs
     http_req_sending...............: avg=23.91µs p(99)=353.05µs
     http_req_tls_handshaking.......: avg=0s      p(99)=0s
     http_req_waiting...............: avg=4.09ms  p(99)=9.85ms
     http_reqs......................: 11502  1149.414923/s
     iteration_duration.............: avg=8.67ms  p(99)=18.71ms
     iterations.....................: 5751   574.707461/s
     vus............................: 5      min=5         max=5
     vus_max........................: 5      min=5         max=5


running (10.0s), 0/5 VUs, 5751 complete and 0 interrupted iterations
default ✓ [======================================] 5 VUs  10s
```
