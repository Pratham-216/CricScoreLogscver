var app = angular.module('scoreboard', []);
app.controller('regiCtrl', function ($scope) {
    $scope.team_a = localStorage.getItem("team_a_name") || '';     //stores name of Team a
    $scope.team_b = localStorage.getItem("team_b_name") || '';     //stores name of Team b
    $scope.match_type = localStorage.getItem("match_type") || 'limOvers'; //stores type of match
    $scope.batting_mode = localStorage.getItem("batting_mode") || 'duoBat';
    $scope.maxovers = parseInt(localStorage.getItem("maxOverLimF")) || 20;       //stores no of maximum overs for limited over match
    $scope.numPlayers = parseInt(localStorage.getItem("numplayers")) || 11;      //stores no of maximum players 
    $scope.Toss = JSON.parse(localStorage.getItem("toss_bool")) || false;
    $scope.Isvisible = JSON.parse(localStorage.getItem("visible_bool")) || false;
    $scope.lineups = JSON.parse(localStorage.getItem("lineups_bool")) || false;
    $scope.ta_players = JSON.parse(localStorage.getItem("Team_A")) || [];     //stores the list of players name of team a 
    $scope.tb_players = JSON.parse(localStorage.getItem("Team_B")) || [];     //stores the list of players name of team b
    $scope.max_days = parseInt(localStorage.getItem("MaxDays")) || 3;
    $scope.overs_per_day = parseInt(localStorage.getItem("maxovers")) || 15;         //stores no of max overs
    $scope.Toss_Won = localStorage.getItem("TOSS");            //Holds value of who won the toss
    $scope.Elc_To = localStorage.getItem("Elected");            //Holds value of elected to bat or field'';
    $scope.venue = localStorage.getItem("venue") || '';
    $scope.DateANDtime = localStorage.getItem("date_time") || '';
    $scope.reset = function () {
        localStorage.clear();
        window.location.replace(window.location.href);
    }
    $scope.startMatch = function () {
        if ($scope.match_type === 'limOvers') {
            window.location.href = "limited_overs.html";
        }
        else if ($scope.match_type === 'multiDays') {
            window.location.href = "days_cricket.html";
        }
    }
    $scope.addLineups = function () {
        var parts = $scope.DateANDtime.split(",");
        var date = localStorage.getItem("date") || parts[0];
        var time = localStorage.getItem("time") || parts[1];
        if ($scope.registration.$valid) {
            localStorage.setItem("team_a_name", $scope.team_a);
            localStorage.setItem("team_b_name", $scope.team_b);
            localStorage.setItem("numplayers", $scope.numPlayers);
            localStorage.setItem("MaxDays", $scope.max_days);
            localStorage.setItem("maxovers", $scope.overs_per_day);
            localStorage.setItem("match_type", $scope.match_type);
            localStorage.setItem("maxOverLimF", $scope.maxovers);
            localStorage.setItem("batting_mode", $scope.batting_mode);
            localStorage.setItem("venue", $scope.venue);
            localStorage.setItem("date", date);
            localStorage.setItem("time", time);
            localStorage.setItem("date_time", $scope.DateANDtime);
            $scope.lineups = true;
            localStorage.setItem("lineups_bool", JSON.stringify($scope.lineups));
        } else {
            $scope.lineups = false;
        }
    }
    $scope.saveTa = function () {
        if ($scope.ta_players.length >= $scope.numPlayers) {
            alert(`${$scope.team_a} is full`);
            return;
        }
        if (!$scope.ta_newPlayer || !$scope.ta_newPlayer.name || $scope.ta_newPlayer.name.trim() === "") {
            alert("Enter player name!");
            return;
        }
        $scope.ta_players.push({
            id: $scope.ta_players.length + 1,
            name: $scope.ta_newPlayer.name.trim()
        });
        $scope.ta_newPlayer = {};
    }

    $scope.saveTb = function () {
        if ($scope.tb_players.length >= $scope.numPlayers) {
            alert(`${$scope.team_b} is full`);
            return;
        }
        if (!$scope.tb_newPlayer || !$scope.tb_newPlayer.name || $scope.tb_newPlayer.name.trim() === "") {
            alert("Enter player name!");
            return;
        }
        $scope.tb_players.push({
            id: $scope.tb_players.length + 1,
            name: $scope.tb_newPlayer.name.trim()
        });
        $scope.tb_newPlayer = {};
    }
    $scope.toss = function () {
        if ($scope.registration.$valid) {
            localStorage.setItem("Team_A", JSON.stringify($scope.ta_players));
            localStorage.setItem("Team_B", JSON.stringify($scope.tb_players));
            $scope.Toss = true;  // Make the score display visible
            localStorage.setItem("toss_bool", JSON.stringify($scope.Toss));
        } else {
            $scope.Toss = false;  // Don't display if form is invalid
        }
    };
    $scope.tossA = function () {
        $scope.Toss_Won = $scope.team_a;
    }
    $scope.tossB = function () {
        $scope.Toss_Won = $scope.team_b;
    }
    $scope.display = function () {
        if ($scope.registration.$valid) {
            console.log('[DEBUG] Setting localStorage TOSS:', $scope.Toss_Won);
            console.log('[DEBUG] Setting localStorage Elected:', $scope.Elc_To);
            localStorage.setItem("TOSS", $scope.Toss_Won);
            localStorage.setItem("Elected", $scope.Elc_To);
            $scope.Isvisible = true;  // Make the score display visible
            localStorage.setItem("visible_bool", JSON.stringify($scope.Isvisible));
        } else {
            $scope.Isvisible = false;  // Don't display if form is invalid
        }
    };
});

app.controller('DaysCricsysCtrl', function ($scope) {
    $scope.Team_a = localStorage.getItem("team_a_name");
    $scope.Team_b = localStorage.getItem("team_b_name");
    $scope.Toss = localStorage.getItem("TOSS");
    $scope.elc = localStorage.getItem("Elected");
    $scope.Team_a_lineups = JSON.parse(localStorage.getItem("Team_A")) || [];
    $scope.Team_b_lineups = JSON.parse(localStorage.getItem("Team_B")) || [];
    $scope.Innings;
    $scope.Ist_inn;
    $scope.IInd_inn;
    $scope.IIIrd_inn;
    $scope.IVth_inn;
    $scope.runs = parseInt(localStorage.getItem("Runs")) || 0;
    $scope.wkt = parseInt(localStorage.getItem("Wickets")) || 0;
    $scope.balls = parseInt(localStorage.getItem("Balls")) || 0;
    $scope.whole_overs = parseInt(localStorage.getItem("Whole_Overs")) || 0;
    $scope.Fours = parseInt(localStorage.getItem("FOURS")) || 0;
    $scope.Six = parseInt(localStorage.getItem("SIX")) || 0;
    $scope.EXTRAS = parseInt(localStorage.getItem("Extras")) || 0;
    $scope.crr = localStorage.getItem("CRR") || "--";
    $scope.Overs = `${$scope.whole_overs}.${$scope.balls}`;
    $scope.Ist_inn_score = JSON.parse(localStorage.getItem("Ist_inning_score")) || {
        Runs: $scope.runs, WKT: $scope.wkt, Overs: $scope.Overs, RR: $scope.crr,
        num_four: $scope.Fours, num_six: $scope.Six, Extras: $scope.EXTRAS
    };
    $scope.IInd_inn_score = JSON.parse(localStorage.getItem("IInd_inning_score")) || {
        Runs: $scope.runs, WKT: $scope.wkt, Overs: $scope.Overs, RR: $scope.crr,
        num_four: $scope.Fours, num_six: $scope.Six, Extras: $scope.EXTRAS
    };
    $scope.IIIrd_inn_score = JSON.parse(localStorage.getItem("IIIrd_inning_score")) || {
        Runs: $scope.runs, WKT: $scope.wkt, Overs: $scope.Overs, RR: $scope.crr,
        num_four: $scope.Fours, num_six: $scope.Six, Extras: $scope.EXTRAS
    };
    $scope.IVth_inn_score = JSON.parse(localStorage.getItem("IVth_inning_score")) || {
        Runs: $scope.runs, WKT: $scope.wkt, Overs: $scope.Overs, RR: $scope.crr,
        num_four: $scope.Fours, num_six: $scope.Six, Extras: $scope.EXTRAS
    };
    $scope.Ist_inn_score_diff = parseInt(localStorage.getItem("Ist_Inn_Score_Diff"));
    $scope.IInd_inn_score_diff = parseInt(localStorage.getItem("IInd_Inn_Score_Diff"));
    $scope.current_inn = JSON.parse(localStorage.getItem("Current_inn_setup")) || ["1st", "2nd", "3rd", "4th"];
    $scope.max_days = parseInt(localStorage.getItem("MaxDays"));
    $scope.Crr_Day = parseInt(localStorage.getItem("Current_day")) || 1;
    $scope.max_overs = parseInt(localStorage.getItem("maxovers"));
    $scope.max_wkt = parseInt(localStorage.getItem("numplayers")) - 1;
    $scope.declared = false;
    $scope.extra = 0;
    $scope.i = parseInt(localStorage.getItem("Curr_inn_index")) || 0;
    $scope.Day_stumps = parseInt(localStorage.getItem("Day_Stumped")) || 0;
    $scope.FollowOn = parseInt(localStorage.getItem("is_followed_on")) || 0;
    $scope.Target = parseInt(localStorage.getItem("target")) || 0
    $scope.result = localStorage.getItem("final_result");
    // --- Robust per-innings, per-team player stats arrays for 4 innings ---
    // Batting and bowling arrays for each team and each innings
    function getOrInitArray(key, lineup, isBatting) {
        let arr = JSON.parse(localStorage.getItem(key));
        if (!arr || !Array.isArray(arr) || arr.length !== lineup.length) {
            // Initialize from lineup
            arr = lineup.map(player => isBatting ? {
                pid: player.id,
                name: player.name,
                runs: 0,
                balls: 0,
                fours: 0,
                six: 0,
                strikeRate: 0,
                isOut: false
            } : {
                pid: player.id,
                name: player.name,
                overs: 0,
                balls: 0,
                runsConceded: 0,
                wickets: 0,
                economy: 0,
                extrasConceded: 0
            });
        }
        return arr;
    }

    // For each innings, for each team
    $scope.Team_a_battingscores_1st = getOrInitArray("Team_a_battingscores_1st", $scope.Team_a_lineups, true);
    $scope.Team_b_battingscores_1st = getOrInitArray("Team_b_battingscores_1st", $scope.Team_b_lineups, true);
    $scope.Team_a_battingscores_2nd = getOrInitArray("Team_a_battingscores_2nd", $scope.Team_a_lineups, true);
    $scope.Team_b_battingscores_2nd = getOrInitArray("Team_b_battingscores_2nd", $scope.Team_b_lineups, true);
    $scope.Team_a_battingscores_3rd = getOrInitArray("Team_a_battingscores_3rd", $scope.Team_a_lineups, true);
    $scope.Team_b_battingscores_3rd = getOrInitArray("Team_b_battingscores_3rd", $scope.Team_b_lineups, true);
    $scope.Team_a_battingscores_4th = getOrInitArray("Team_a_battingscores_4th", $scope.Team_a_lineups, true);
    $scope.Team_b_battingscores_4th = getOrInitArray("Team_b_battingscores_4th", $scope.Team_b_lineups, true);

    $scope.Team_a_bowlingscores_1st = getOrInitArray("Team_a_bowlingscores_1st", $scope.Team_a_lineups, false);
    $scope.Team_b_bowlingscores_1st = getOrInitArray("Team_b_bowlingscores_1st", $scope.Team_b_lineups, false);
    $scope.Team_a_bowlingscores_2nd = getOrInitArray("Team_a_bowlingscores_2nd", $scope.Team_a_lineups, false);
    $scope.Team_b_bowlingscores_2nd = getOrInitArray("Team_b_bowlingscores_2nd", $scope.Team_b_lineups, false);
    $scope.Team_a_bowlingscores_3rd = getOrInitArray("Team_a_bowlingscores_3rd", $scope.Team_a_lineups, false);
    $scope.Team_b_bowlingscores_3rd = getOrInitArray("Team_b_bowlingscores_3rd", $scope.Team_b_lineups, false);
    $scope.Team_a_bowlingscores_4th = getOrInitArray("Team_a_bowlingscores_4th", $scope.Team_a_lineups, false);
    $scope.Team_b_bowlingscores_4th = getOrInitArray("Team_b_bowlingscores_4th", $scope.Team_b_lineups, false);

    // Helper to get the correct array for the current innings and team
    function getBattingArr(team, innIdx) {
        const arrs = [
            team === 'A' ? $scope.Team_a_battingscores_1st : $scope.Team_b_battingscores_1st,
            team === 'A' ? $scope.Team_a_battingscores_2nd : $scope.Team_b_battingscores_2nd,
            team === 'A' ? $scope.Team_a_battingscores_3rd : $scope.Team_b_battingscores_3rd,
            team === 'A' ? $scope.Team_a_battingscores_4th : $scope.Team_b_battingscores_4th
        ];
        return arrs[innIdx];
    }
    function getBowlingArr(team, innIdx) {
        const arrs = [
            team === 'A' ? $scope.Team_a_bowlingscores_1st : $scope.Team_b_bowlingscores_1st,
            team === 'A' ? $scope.Team_a_bowlingscores_2nd : $scope.Team_b_bowlingscores_2nd,
            team === 'A' ? $scope.Team_a_bowlingscores_3rd : $scope.Team_b_bowlingscores_3rd,
            team === 'A' ? $scope.Team_a_bowlingscores_4th : $scope.Team_b_bowlingscores_4th
        ];
        return arrs[innIdx];
    }

    
    // Swap striker and non-striker
    $scope.swapStrikers = function () {
        var temp = $scope.strikerId;
        $scope.strikerId = $scope.nonStrikerId;
        $scope.nonStrikerId = temp;
        
    };

    
    // Update batting stats for a player in the current inning
    $scope.updateBatting = function (playerId, addruns, boundary = false, out = false) {
        let innIdx = $scope.i;
        let team = ($scope.Innings === $scope.Team_a) ? 'A' : 'B';
        let arr = getBattingArr(team, innIdx);
        let player = arr.find(p => p.pid == playerId);
        if (!player) return;
        player.runs += addruns;
        player.balls += 1;
        if (addruns == 4 && boundary) player.fours += 1;
        if (addruns == 6 && boundary) player.six += 1;
        if (out) player.isOut = true;
        player.strikeRate = player.balls > 0 ? ((player.runs / player.balls) * 100).toFixed(2) : 0;
        syncPlayerStatsToLocalStorage();
    };

    // Update bowling stats for a player in the current inning
    $scope.updateBowling = function (playerId, addruns, iswicket = false, isextra = false, addextra = 0) {
        let innIdx = $scope.i;
        let team = ($scope.Innings === $scope.Team_a) ? 'B' : 'A';
        let arr = getBowlingArr(team, innIdx);
        let player = arr.find(p => p.pid == playerId);
        if (!player) return;
        if (!isextra) {
            player.balls += 1;
            if (player.balls % 6 === 0) {
                player.overs += 1;
                player.balls = 0;
            }
        }
        player.runsConceded += addruns;
        if (iswicket) player.wickets += 1;
        if (isextra) player.extrasConceded += addextra;
        let totalBalls = player.overs * 6 + player.balls;
        player.economy = totalBalls > 0 ? (player.runsConceded / (totalBalls / 6)).toFixed(2) : 0;
        syncPlayerStatsToLocalStorage();
    };

    // Sync all player stats arrays to localStorage
    function syncPlayerStatsToLocalStorage() {
        localStorage.setItem("Team_a_battingscores_1st", JSON.stringify($scope.Team_a_battingscores_1st));
        localStorage.setItem("Team_b_battingscores_1st", JSON.stringify($scope.Team_b_battingscores_1st));
        localStorage.setItem("Team_a_battingscores_2nd", JSON.stringify($scope.Team_a_battingscores_2nd));
        localStorage.setItem("Team_b_battingscores_2nd", JSON.stringify($scope.Team_b_battingscores_2nd));
        localStorage.setItem("Team_a_battingscores_3rd", JSON.stringify($scope.Team_a_battingscores_3rd));
        localStorage.setItem("Team_b_battingscores_3rd", JSON.stringify($scope.Team_b_battingscores_3rd));
        localStorage.setItem("Team_a_battingscores_4th", JSON.stringify($scope.Team_a_battingscores_4th));
        localStorage.setItem("Team_b_battingscores_4th", JSON.stringify($scope.Team_b_battingscores_4th));

        localStorage.setItem("Team_a_bowlingscores_1st", JSON.stringify($scope.Team_a_bowlingscores_1st));
        localStorage.setItem("Team_b_bowlingscores_1st", JSON.stringify($scope.Team_b_bowlingscores_1st));
        localStorage.setItem("Team_a_bowlingscores_2nd", JSON.stringify($scope.Team_a_bowlingscores_2nd));
        localStorage.setItem("Team_b_bowlingscores_2nd", JSON.stringify($scope.Team_b_bowlingscores_2nd));
        localStorage.setItem("Team_a_bowlingscores_3rd", JSON.stringify($scope.Team_a_bowlingscores_3rd));
        localStorage.setItem("Team_b_bowlingscores_3rd", JSON.stringify($scope.Team_b_bowlingscores_3rd));
        localStorage.setItem("Team_a_bowlingscores_4th", JSON.stringify($scope.Team_a_bowlingscores_4th));
        localStorage.setItem("Team_b_bowlingscores_4th", JSON.stringify($scope.Team_b_bowlingscores_4th));
    }

    // Helpers for UI to get player stats for a given innings
    $scope.getBattingScores = function (team, innIdx) {
        return getBattingArr(team, innIdx);
    };
    $scope.getBowlingScores = function (team, innIdx) {
        return getBowlingArr(team, innIdx);
    };
    function syncToLocalStorage() {
        localStorage.setItem("Runs", $scope.runs);
        localStorage.setItem("Wickets", $scope.wkt);
        localStorage.setItem("Balls", $scope.balls);
        localStorage.setItem("Whole_Overs", $scope.whole_overs);
        localStorage.setItem("FOURS", $scope.Fours);
        localStorage.setItem("SIX", $scope.Six);
        localStorage.setItem("Extras", $scope.EXTRAS);
        localStorage.setItem("CRR", $scope.crr);
        localStorage.setItem("OVERS", `${$scope.whole_overs}.${$scope.balls}`);
        localStorage.setItem("Curr_inn_index", $scope.i);
        localStorage.setItem("Current_day", $scope.Crr_Day);
        localStorage.setItem("Day_Stumped", $scope.Day_stumps);
        localStorage.setItem("Ist_Inn_Score_Diff", $scope.Ist_inn_score_diff);
        localStorage.setItem("IInd_Inn_Score_Diff", $scope.IInd_inn_score_diff);
        localStorage.setItem("is_followed-on", $scope.FollowOn);
        localStorage.setItem("Current_inn_setup", JSON.stringify($scope.current_inn));
        localStorage.setItem("target", $scope.Target);
        localStorage.setItem("final_result", $scope.result);
        switch ($scope.current_inn[$scope.i]) {
            case "1st":
                $scope.Ist_inn_score = {
                    Runs: $scope.runs, WKT: $scope.wkt, Overs: $scope.Overs, RR: $scope.crr,
                    num_four: $scope.Fours, num_six: $scope.Six, Extras: $scope.EXTRAS
                };
                localStorage.setItem("Ist_inning_score", JSON.stringify($scope.Ist_inn_score));
                break;
            case "2nd":
                $scope.IInd_inn_score = {
                    Runs: $scope.runs, WKT: $scope.wkt, Overs: $scope.Overs, RR: $scope.crr,
                    num_four: $scope.Fours, num_six: $scope.Six, Extras: $scope.EXTRAS
                };
                localStorage.setItem("IInd_inning_score", JSON.stringify($scope.IInd_inn_score));
                break;
            case "3rd":
                $scope.IIIrd_inn_score = {
                    Runs: $scope.runs, WKT: $scope.wkt, Overs: $scope.Overs, RR: $scope.crr,
                    num_four: $scope.Fours, num_six: $scope.Six, Extras: $scope.EXTRAS
                };
                localStorage.setItem("IIIrd_inning_score", JSON.stringify($scope.IIIrd_inn_score));
                break
            case "4th":
                $scope.IVth_inn_score = {
                    Runs: $scope.runs, WKT: $scope.wkt, Overs: $scope.Overs, RR: $scope.crr,
                    num_four: $scope.Fours, num_six: $scope.Six, Extras: $scope.EXTRAS
                };
                localStorage.setItem("IVth_inning_score", JSON.stringify($scope.IVth_inn_score));
                break;
        }
        localStorage.setItem("battingStats", JSON.stringify($scope.battingStats));
        localStorage.setItem("bowlingStats", JSON.stringify($scope.bowlingStats));
    }

    function setupInningsOrder() {
        // Normalize elc value
        var elected = ($scope.elc || '').trim();
        console.log('DEBUG: Toss:', $scope.Toss, 'Elected:', elected);
        if ($scope.Toss == $scope.Team_a) {
            if (elected == "Bat") {
                $scope.Ist_inn = $scope.Team_a;
                $scope.IInd_inn = $scope.Team_b;
            }
            else if (elected == "Field") {
                $scope.Ist_inn = $scope.Team_b;
                $scope.IInd_inn = $scope.Team_a;
            }
        }
        else if ($scope.Toss == $scope.Team_b) {
            if (elected == "Bat") {
                $scope.Ist_inn = $scope.Team_b;
                $scope.IInd_inn = $scope.Team_a;
            }
            else if (elected == "Field") {
                $scope.Ist_inn = $scope.Team_a;
                $scope.IInd_inn = $scope.Team_b;
            }
        }
        $scope.IIIrd_inn = $scope.Ist_inn;
        $scope.IVth_inn = $scope.IInd_inn;
    }
    setupInningsOrder();
    function updateCurrinn() {
        switch ($scope.current_inn[$scope.i]) {
            case "1st":
                $scope.Innings = $scope.Ist_inn;
                break;
            case "2nd":
                $scope.Innings = $scope.IInd_inn;
                break;
            case "3rd":
                $scope.Innings = $scope.IIIrd_inn;
                break;
            case "4th":
                $scope.Innings = $scope.IVth_inn;
                break;
            default:
                alert("End of game!!!");
        }
    }
    updateCurrinn();
    $scope.next_innings = function () {
        $scope.runs = 0;
        $scope.wkt = 0;
        $scope.whole_overs = 0;
        $scope.balls = 0;
        $scope.Overs = "0.0";
        $scope.Fours = 0;
        $scope.Six = 0;
        $scope.EXTRAS = 0;
        $scope.i++;
        $scope.crr = "--";
        $scope.declared = false;
        updateCurrinn();
        CalTarget();
        syncToLocalStorage();
    }
    $scope.declaration = function () {
        $scope.declared = true;
    }
    $scope.stumps = function () {
        $scope.Day_stumps = 1;
        makeResult();
        syncToLocalStorage();
    }
    $scope.startNewDay = function () {
        if ($scope.Crr_Day < $scope.max_days) {
            $scope.Day_stumps = 0;
            $scope.Crr_Day++;
            makeResult();
            syncToLocalStorage();
        }
        else {
            alert("Game Over!!!");
        }
    }
    function CalTarget() {
        if ($scope.i == 3 && $scope.IInd_inn_score_diff > 0) {
            $scope.Target = $scope.IInd_inn_score_diff + 1;
            syncToLocalStorage();
        }
    }
    $scope.buttonLabel1st = function () {
        let lable = $scope.Ist_inn + ' 1st Innings - ' + $scope.Ist_inn_score.Runs;
        if (parseInt($scope.Ist_inn_score.WKT) != $scope.max_wkt) {
            lable += '/' + $scope.Ist_inn_score.WKT;
        }
        return lable;
    }
    $scope.buttonLabel2nd = function () {
        let lable = $scope.IInd_inn + ' 1st Innings - ' + $scope.IInd_inn_score.Runs;
        if (parseInt($scope.IInd_inn_score.WKT) != $scope.max_wkt) {
            lable += '/' + $scope.IInd_inn_score.WKT;
        }
        return lable;
    }
    $scope.buttonLabel3rd = function () {
        if ($scope.FollowOn == 0) {
            let lable = $scope.IIIrd_inn + ' 2nd Innings - ' + $scope.IIIrd_inn_score.Runs;
            if (parseInt($scope.IIIrd_inn_score.WKT) != $scope.max_wkt) {
                lable += '/' + $scope.IIIrd_inn_score.WKT;
            }
            return lable;
        }
        else if ($scope.FollowOn == 1) {
            let lable = $scope.IVth_inn + ' 2nd Innings - ' + $scope.IVth_inn_score.Runs;
            if (parseInt($scope.IVth_inn_score.WKT) != $scope.max_wkt) {
                lable += '/' + $scope.IVth_inn_score.WKT;
            }
            return lable;
        }
    }
    $scope.buttonLabel4th = function () {
        if ($scope.FollowOn == 0) {
            let lable = $scope.IVth_inn + ' 2nd Innings - ' + $scope.IVth_inn_score.Runs;
            if (parseInt($scope.IVth_inn_score.WKT) != $scope.max_wkt) {
                lable += '/' + $scope.IVth_inn_score.WKT;
            }
            return lable;
        }
        else if ($scope.FollowOn == 1) {
            let lable = $scope.IIIrd_inn + ' 2nd Innings - ' + $scope.IIIrd_inn_score.Runs;
            if (parseInt($scope.IIIrd_inn_score.WKT) != $scope.max_wkt) {
                lable += '/' + $scope.IIIrd_inn_score.WKT;
            }
            return lable;
        }
    }
    function makeResult() {
        //for game ending in 3rd innings(or follow on condition)
        if ($scope.FollowOn == 1 && $scope.i == 2) {
            if ($scope.wkt == $scope.max_wkt && $scope.IInd_inn_score_diff < 0) {
                const margin = Math.abs($scope.IInd_inn_score_diff);
                $scope.result = `${$scope.Ist_inn} won by an innings and ${margin} runs`;
            } else if (($scope.Crr_Day == $scope.max_days && $scope.Day_stumps == 1)) {
                $scope.result = "Match Draw";
            }
            else if ($scope.i == 3) {
                if ($scope.IIIrd_inn_score.Runs >= $scope.Target) {
                    const wkt_remaining = $scope.max_wkt - $scope.IIIrd_inn_score.WKT;
                    $scope.result = `${$scope.IIIrd_inn} won by ${wkt_remaining} wickets`;
                }
                else if ($scope.IIIrd_inn_score.Runs == $scope.Target - 1 && $scope.IIIrd_inn_score.WKT == $scope.max_wkt) {
                    $scope.result = "Match Tied"
                }
                else if ($scope.IIIrd_inn_score.Runs < $scope.Target && $scope.IIIrd_inn_score.WKT == $scope.max_wkt) {
                    const margin = ($scope.Target - 1) - $scope.IIIrd_inn_score.Runs
                    $scope.result = `${$scope.Ist_inn} won by ${margin} runs`;
                }
            }
        }

        //for game ending in 3rd innings without
        if ($scope.FollowOn == 0 && $scope.i == 2) {
            if ($scope.wkt == $scope.max_wkt && $scope.IInd_inn_score_diff < 0) {
                const margin = Math.abs($scope.IInd_inn_score_diff);
                $scope.result = `${$scope.IInd_inn} won by an innings and ${margin} runs`;
            }
        }

        //for normal outright win
        if ($scope.i == 3) {
            if ($scope.IVth_inn_score.Runs >= $scope.Target) {
                const wkt_remaining = $scope.max_wkt - $scope.IVth_inn_score.WKT;
                $scope.result = `${$scope.IVth_inn} won by ${wkt_remaining} wickets`;
            }
            else if ($scope.IVth_inn_score.Runs == $scope.Target - 1 && $scope.IVth_inn_score.WKT == $scope.max_wkt) {
                $scope.result = "Match Tied"
            }
            else if ($scope.IVth_inn_score.Runs < $scope.Target && $scope.IVth_inn_score.WKT == $scope.max_wkt) {
                const margin = ($scope.Target - 1) - $scope.IVth_inn_score.Runs
                $scope.result = `${$scope.Ist_inn} won by ${margin} runs`;
            }

        }

        if ($scope.Crr_Day == $scope.max_days && $scope.Day_stumps == 1) {
            $scope.result = "Match Draw";

        }
        syncToLocalStorage();
    }
    $scope.over_ball_sim = function () {
        if ($scope.balls < 5) {
            $scope.balls++;
        }
        else {
            $scope.balls = 0;
            $scope.whole_overs++;
            $scope.swapStrikers();
        }
        $scope.Overs = `${$scope.whole_overs}.${$scope.balls}`;
        syncToLocalStorage();
    }
    $scope.cal_crr = function () {
        $scope.rr = $scope.runs / ($scope.whole_overs + ($scope.balls / 6));
        $scope.crr = $scope.rr.toFixed(2);
        syncToLocalStorage();
        calScoreDiff();
        makeResult();
        syncToLocalStorage();
    }
    function calScoreDiff() {
        if ($scope.i == 1) {
            $scope.Ist_inn_score_diff = ($scope.IInd_inn_score.Runs - $scope.Ist_inn_score.Runs);
        }
        else if ($scope.i == 2 && $scope.FollowOn == 0) {
            $scope.IInd_inn_score_diff = ($scope.IIIrd_inn_score.Runs - $scope.Ist_inn_score_diff);
        }
        else if ($scope.i == 2 && $scope.FollowOn == 1) {
            $scope.IInd_inn_score_diff = ($scope.IVth_inn_score.Runs - (0 - $scope.Ist_inn_score_diff));

        }
        CalTarget();
    }
    $scope.follow_on = function () {
        $scope.current_inn = ["1st", "2nd", "4th", "3rd"];
        $scope.FollowOn = 1;
        syncToLocalStorage();
        alert(`${$scope.Ist_inn} impossed follow-on!!!`);
    }
    $scope.wicket = function () {
        if ($scope.declared == false && $scope.wkt < $scope.max_wkt && $scope.result == null) {
            $scope.wkt = $scope.wkt + 1;
            $scope.over_ball_sim();
            $scope.cal_crr();
            $scope.updateBowling($scope.bowlerId, 0, true);
            $scope.updateBatting($scope.strikerId, 0, false, true);
            syncPlayerStatsToLocalStorage();
        } else {
            alert("End of the innings!!!");
        }
    }
    $scope.dot = function () {
        if ($scope.declared == false && $scope.wkt < $scope.max_wkt && $scope.result == null) {
            $scope.runs = $scope.runs + 0;
            $scope.over_ball_sim();
            $scope.cal_crr();
            $scope.updateBatting($scope.strikerId, 0);
            $scope.updateBowling($scope.bowlerId, 0, false);
            syncPlayerStatsToLocalStorage();
        } else {
            alert("End of the innings!!!");
        }
    }
    $scope.single = function () {
        if ($scope.declared == false && $scope.wkt < $scope.max_wkt && $scope.result == null) {
            $scope.runs = $scope.runs + 1;
            $scope.over_ball_sim();
            $scope.cal_crr();
            $scope.updateBatting($scope.strikerId, 1);
            $scope.updateBowling($scope.bowlerId, 1, false);
            syncPlayerStatsToLocalStorage();
            $scope.swapStrikers();
        } else {
            alert("End of the innings!!!");
        }
    }
    $scope.double = function () {
        if ($scope.declared == false && $scope.wkt < $scope.max_wkt && $scope.result == null) {
            $scope.runs = $scope.runs + 2;
            $scope.over_ball_sim();
            $scope.cal_crr();
            $scope.updateBatting($scope.strikerId, 2);
            $scope.updateBowling($scope.bowlerId, 2, false);
            syncPlayerStatsToLocalStorage();
        } else {
            alert("End of the innings!!!");
        }
    }
    $scope.triple = function () {
        if ($scope.declared == false && $scope.wkt < $scope.max_wkt && $scope.result == null) {
            $scope.runs = $scope.runs + 3;
            $scope.over_ball_sim();
            $scope.cal_crr();
            $scope.updateBatting($scope.strikerId, 3);
            $scope.updateBowling($scope.bowlerId, 3, false);
            syncPlayerStatsToLocalStorage();
            $scope.swapStrikers();
        } else {
            alert("End of the innings!!!");
        }
    }
    $scope.four = function () {
        if ($scope.declared == false && $scope.wkt < $scope.max_wkt && $scope.result == null) {
            $scope.runs = $scope.runs + 4;
            $scope.over_ball_sim();
            $scope.cal_crr();
            $scope.updateBatting($scope.strikerId, 4, true);
            $scope.updateBowling($scope.bowlerId, 4, false);
            syncPlayerStatsToLocalStorage();
        } else {
            alert("End of the innings!!!");
        }
    }
    $scope.five = function () {
        if ($scope.declared == false && $scope.wkt < $scope.max_wkt && $scope.result == null) {
            $scope.runs = $scope.runs + 5;
            $scope.over_ball_sim();
            $scope.cal_crr();
            $scope.updateBatting($scope.strikerId, 5);
            $scope.updateBowling($scope.bowlerId, 5, false);
            syncPlayerStatsToLocalStorage();
            $scope.swapStrikers();
        } else {
            alert("End of the innings!!!");
        }
    }
    $scope.six = function () {
        if ($scope.declared == false && $scope.wkt < $scope.max_wkt && $scope.result == null) {
            $scope.runs = $scope.runs + 6;
            $scope.over_ball_sim();
            $scope.cal_crr();
            $scope.updateBatting($scope.strikerId, 6, true);
            $scope.updateBowling($scope.bowlerId, 6, false);
            syncPlayerStatsToLocalStorage();
        } else {
            alert("End of the innings!!!");
        }
    }
    $scope.B_four = function () {
        if ($scope.declared == false && $scope.wkt < $scope.max_wkt && $scope.result == null) {
            $scope.Fours = $scope.Fours + 1;
            $scope.four();
        } else {
            alert("End of the innings!!!");
        }
    }
    $scope.B_six = function () {
        if ($scope.declared == false && $scope.wkt < $scope.max_wkt && $scope.result == null) {
            $scope.Six = $scope.Six + 1;
            $scope.six();
        } else {
            alert("End of the innings!!!");
        }
    }
    $scope.wide = function () {
        if ($scope.declared == false && $scope.wkt < $scope.max_wkt && $scope.result == null) {
            var runs = $scope.extra + 1;
            $scope.runs = $scope.runs + runs;
            $scope.EXTRAS = $scope.EXTRAS + runs;
            $scope.updateBowling($scope.bowlerId, runs, false, true, runs);
            syncPlayerStatsToLocalStorage();
            $scope.cal_crr();
            $scope.extra = 0;
        } else {
            alert("End of the innings!!!");
        }
    }
    $scope.no_ball = function () {
        if ($scope.declared == false && $scope.wkt < $scope.max_wkt && $scope.result == null) {
            var runs = $scope.extra + 1;
            $scope.runs = $scope.runs + runs;
            $scope.EXTRAS = $scope.EXTRAS + 1;
            $scope.updateBowling($scope.bowlerId, 1, false, true, 1);
            syncPlayerStatsToLocalStorage();
            $scope.cal_crr();
            $scope.extra = 0;
        } else {
            alert("End of the innings!!!");
        }
    }
    $scope.leg_bye = function () {
        if ($scope.declared == false && $scope.wkt < $scope.max_wkt && $scope.result == null) {
            $scope.runs = $scope.runs + $scope.extra;
            $scope.EXTRAS = $scope.EXTRAS + $scope.extra;
            $scope.over_ball_sim();
            $scope.updateBowling($scope.bowlerId, 0, false, true, $scope.extra);
            syncPlayerStatsToLocalStorage();
            $scope.cal_crr();
            $scope.extra = 0;
        } else {
            alert("End of the innings!!!");
        }
    }
    $scope.bye = function () {
        if ($scope.declared == false && $scope.wkt < $scope.max_wkt && $scope.result == null) {
            $scope.runs = $scope.runs + $scope.extra;
            $scope.EXTRAS = $scope.EXTRAS + $scope.extra;
            $scope.over_ball_sim();
            $scope.updateBowling($scope.bowlerId, 0, false, true, $scope.extra);
            syncPlayerStatsToLocalStorage();
            $scope.cal_crr();
            $scope.extra = 0;
        } else {
            alert("End of the innings!!!");
        }
    }
    $scope.leg_byeOnNB = function () {
        if ($scope.declared == false && $scope.wkt < $scope.max_wkt && $scope.result == null) {
            var runs = $scope.extra + 1;
            $scope.runs = $scope.runs + runs;
            $scope.EXTRAS = $scope.EXTRAS + runs;
            $scope.updateBowling($scope.bowlerId, 1, false, true, runs);
            syncPlayerStatsToLocalStorage();
            $scope.cal_crr();
            $scope.extra = 0;
        } else {
            alert("End of the innings!!!");
        }
    }
    $scope.byeOnNB = function () {
        if ($scope.declared == false && $scope.wkt < $scope.max_wkt && $scope.result == null) {
            var runs = $scope.extra + 1;
            $scope.runs = $scope.runs + runs;
            $scope.EXTRAS = $scope.EXTRAS + runs;
            $scope.updateBowling($scope.bowlerId, 1, false, true, runs);
            syncPlayerStatsToLocalStorage();
            $scope.cal_crr();
            $scope.extra = 0;
        } else {
            alert("End of the innings!!!");
        }
    }
    $scope.Nb4plus = function () {
        if ($scope.declared == false && $scope.wkt < $scope.max_wkt && $scope.result == null) {
            $scope.runs = $scope.runs + 4 + 1;
            $scope.Fours = $scope.Fours + 1;
            $scope.EXTRAS = $scope.EXTRAS + 1;
            $scope.updateBatting($scope.strikerId, 4, true);
            $scope.updateBowling($scope.bowlerId, 5, false, true, 1);
            syncPlayerStatsToLocalStorage();
            $scope.cal_crr();
        } else {
            alert("End of the innings!!!");
        }
    }
    $scope.Nb6plus = function () {
        if ($scope.declared == false && $scope.wkt < $scope.max_wkt && $scope.result == null) {
            $scope.runs = $scope.runs + 6 + 1;
            $scope.Six = $scope.Six + 1;
            $scope.EXTRAS = $scope.EXTRAS + 1;
            $scope.updateBatting($scope.strikerId, 6, true);
            $scope.updateBowling($scope.bowlerId, 7, false, true, 1);
            syncPlayerStatsToLocalStorage();
            $scope.cal_crr();
        } else {
            alert("End of the innings!!!");
        }
    }
    $scope.penalty = function () {
        $scope.runs = $scope.runs + 5;
        $scope.cal_crr();
    }

    // Get batsman object by playerId for current innings
    $scope.getBatsmanById = function (playerId) {
        if (!playerId) return null;
        var team = ($scope.Innings === $scope.Team_a) ? 'A' : 'B';
        var arr = $scope.getBattingScores(team, $scope.i);
        return arr ? arr.find(function (p) { return p.pid == playerId; }) : null;
    };

    // Get bowler object by playerId for current innings
    $scope.getBowlerById = function (playerId) {
        if (!playerId) return null;
        var team = ($scope.Innings === $scope.Team_a) ? 'B' : 'A';
        var arr = $scope.getBowlingScores(team, $scope.i);
        return arr ? arr.find(function (p) { return p.pid == playerId; }) : null;
    };

    // --- Player selection logic for DaysCricsysCtrl ---
    $scope.strikerId = null;
    $scope.nonStrikerId = null;
    $scope.bowlerId = null;

    /**
     * Set the striker, non-striker, and bowler by player id.
     * Ensures striker and non-striker are from the batting team,
     * and bowler is from the bowling team.
     * @param {number} strikerId - Player id of the striker batsman
     * @param {number} nonStrikerId - Player id of the non-striker batsman
     * @param {number} bowlerId - Player id of the bowler
     */
    $scope.selectPlayers = function (strikerId, nonStrikerId, bowlerId) {
        // Determine current batting and bowling teams
        let battingLineup, bowlingLineup;
        if ($scope.Innings === $scope.Team_a) {
            battingLineup = $scope.Team_a_lineups;
            bowlingLineup = $scope.Team_b_lineups;
        } else {
            battingLineup = $scope.Team_b_lineups;
            bowlingLineup = $scope.Team_a_lineups;
        }

        // Validate striker and non-striker from batting team
        const striker = battingLineup.find(p => p.id == strikerId);
        const nonStriker = battingLineup.find(p => p.id == nonStrikerId);
        // Validate bowler from bowling team
        const bowler = bowlingLineup.find(p => p.id == bowlerId);

        if (!striker) {
            alert("Invalid striker selected! Must be from batting team.");
            return;
        }
        if (!nonStriker) {
            alert("Invalid non-striker selected! Must be from batting team.");
            return;
        }
        if (!bowler) {
            alert("Invalid bowler selected! Must be from bowling team.");
            return;
        }
        if (strikerId == nonStrikerId) {
            alert("Striker and non-striker cannot be the same player!");
            return;
        }

        $scope.strikerId = strikerId;
        $scope.nonStrikerId = nonStrikerId;
        $scope.bowlerId = bowlerId;
    };

    // Set initial players at the start of the match or innings
    $scope.setInitialPlayers = function () {
        let battingLineup, bowlingLineup;
        if ($scope.Innings === $scope.Team_a) {
            battingLineup = $scope.Team_a_lineups;
            bowlingLineup = $scope.Team_b_lineups;
        } else {
            battingLineup = $scope.Team_b_lineups;
            bowlingLineup = $scope.Team_a_lineups;
        }
        if (battingLineup.length >= 2 && bowlingLineup.length >= 1) {
            $scope.selectPlayers(
                battingLineup[0].id, // striker
                battingLineup[1].id, // non-striker
                bowlingLineup[0].id  // bowler
            );
        }
    };

    // Call setInitialPlayers at the start
    $scope.setInitialPlayers();
});

app.controller('LOCricsysCtrl', function ($scope) {

    // Swap striker and non-striker
    $scope.swapStrikers = function () {
        var temp = $scope.strikerId;
        $scope.strikerId = $scope.nonStrikerId;
        $scope.nonStrikerId = temp;
    };
    // Teams & toss info
    $scope.Team_a = localStorage.getItem("team_a_name");
    $scope.Team_b = localStorage.getItem("team_b_name");
    $scope.Toss = localStorage.getItem("TOSS");
    $scope.elc = localStorage.getItem("Elected");
    $scope.batting_mode = localStorage.getItem("batting_mode");
    $scope.Ist_inn_batting = JSON.parse(localStorage.getItem("Ist_inn_batting")) || [];
    $scope.Ist_inn_bowling = JSON.parse(localStorage.getItem("Ist_inn_bowling")) || [];
    $scope.IInd_inn_batting = JSON.parse(localStorage.getItem("IInd_inn_batting")) || [];
    $scope.IInd_inn_bowling = JSON.parse(localStorage.getItem("IInd_inn_bowling")) || [];

    // Lineups
    $scope.Team_a_lineups = JSON.parse(localStorage.getItem("Team_A")) || [];
    $scope.Team_b_lineups = JSON.parse(localStorage.getItem("Team_B")) || [];

    $scope.Team_a_battingscores = JSON.parse(localStorage.getItem("Team_a_battingscores")) ||
        ($scope.Team_a_lineups || []).map(player => ({
            pid: player.id,
            name: player.name,
            runs: 0,
            balls: 0,
            fours: 0,
            six: 0,
            strikeRate: 0,
            isOut: false,
            batted: false
        }));

    $scope.Team_b_battingscores = JSON.parse(localStorage.getItem("Team_b_battingscores")) ||
        ($scope.Team_b_lineups || []).map(player => ({
            pid: player.id,
            name: player.name,
            runs: 0,
            balls: 0,
            fours: 0,
            six: 0,
            strikeRate: 0,
            isOut: false,
            batted: false
        }));

    $scope.Team_a_bowlingscores = JSON.parse(localStorage.getItem("Team_a_bowlingscores")) ||
        ($scope.Team_a_lineups || []).map(player => ({
            pid: player.id,
            name: player.name,
            overs: 0,
            balls: 0,
            runsConceded: 0,
            dots: 0,
            wickets: 0,
            economy: 0,
            extrasConceded: 0,
            bowled: false
        }));

    $scope.Team_b_bowlingscores = JSON.parse(localStorage.getItem("Team_b_bowlingscores")) ||
        ($scope.Team_b_lineups || []).map(player => ({
            pid: player.id,
            name: player.name,
            overs: 0,
            balls: 0,
            runsConceded: 0,
            dots: 0,
            wickets: 0,
            economy: 0,
            extrasConceded: 0,
            bowled: false
        }));

    $scope.updateBattingStatus = function (team,playerId,hasBatted) {
        let battingscores = team === 'A' ? $scope.Team_a_battingscores : $scope.Team_b_battingscores;
        let player = battingscores.find(p => p.pid === playerId);
        if (player) {
            player.batted = hasBatted;
        }
    }
    $scope.updateBowlingStatus = function (team,playerId,hasBowled) {
        let bowlingscores = team === 'A' ? $scope.Team_a_bowlingscores : $scope.Team_b_bowlingscores;
        let player = bowlingscores.find(p => p.pid === playerId);
        if (player) {
            player.bowled = hasBowled;
        }   
    }

    $scope.updatebattingscore = function (team, playerId, addruns, isboundary = false, out = false) {
        let battingscores = team === 'A' ? $scope.Team_a_battingscores : $scope.Team_b_battingscores;
        let player = battingscores.find(p => p.pid === playerId);
        if (player) {
            player.runs += addruns;
            if (out) player.isOut = true;
            player.balls += 1;
            if (addruns === 4 && isboundary) player.fours += 1;
            if (addruns === 6 && isboundary) player.six += 1;
            // Update strike rate
            player.strikeRate = player.balls > 0 ? ((player.runs / player.balls) * 100).toFixed(2) : 0;
        }
    }

    $scope.updatebowlingscore = function (team, playerId, addruns, iswicket = false, isextra = false, addextra = 0) {
        let bowlingscores = team === 'A' ? $scope.Team_a_bowlingscores : $scope.Team_b_bowlingscores;
        let player = bowlingscores.find(p => p.pid === playerId);
        if (player) {
            if (!isextra) {
                player.balls += 1;
                if (player.balls % 6 === 0) {
                    player.overs += 1;
                    player.balls = 0;
                }
            }
            player.runsConceded += addruns;
            if (addruns === 0 && !isextra) player.dots += 1;
            if (iswicket) player.wickets += 1;
            if (isextra) player.extrasConceded += addextra;
            // Update economy rate
            let totalBalls = player.overs * 6 + player.balls;
            player.economy = totalBalls > 0 ? (player.runsConceded / (totalBalls / 6)).toFixed(2) : 0;
        }
    }


    // Innings
    $scope.Innings;
    $scope.Ist_inn;
    $scope.IInd_inn;

    // Scores & stats
    $scope.runs = parseInt(localStorage.getItem("Runs")) || 0;
    $scope.wkt = parseInt(localStorage.getItem("Wickets")) || 0;
    $scope.balls = parseInt(localStorage.getItem("Balls")) || 0;
    $scope.whole_overs = parseInt(localStorage.getItem("Whole_Overs")) || 0;
    $scope.Fours = parseInt(localStorage.getItem("FOURS")) || 0;
    $scope.Six = parseInt(localStorage.getItem("SIX")) || 0;
    $scope.EXTRAS = parseInt(localStorage.getItem("Extras")) || 0;
    $scope.crr = localStorage.getItem("CRR") || "--";
    $scope.Overs = parseFloat(localStorage.getItem("OVERS")) || "0.0";

    // Innings scores
    $scope.Ist_inn_score = JSON.parse(localStorage.getItem("Ist_inning_score")) || {
        Runs: $scope.runs, WKT: $scope.wkt, Overs: $scope.Overs, RR: $scope.crr,
        num_four: $scope.Fours, num_six: $scope.Six, Extras: $scope.EXTRAS
    };
    $scope.IInd_inn_score = JSON.parse(localStorage.getItem("IInd_inning_score")) || {
        Runs: $scope.runs, WKT: $scope.wkt, Overs: $scope.Overs, RR: $scope.crr,
        num_four: $scope.Fours, num_six: $scope.Six, Extras: $scope.EXTRAS
    };

    // Current innings setup
    $scope.current_inn = JSON.parse(localStorage.getItem("Current_inn_setup")) || ["1st", "2nd"];
    $scope.maxovers = parseInt(localStorage.getItem("maxOverLimF"));
    $scope.max_wkt = $scope.batting_mode === "singleBat" ? parseInt(localStorage.getItem("numplayers")) : parseInt(localStorage.getItem("numplayers")) - 1;
    $scope.extra = 0;
    $scope.i = parseInt(localStorage.getItem("Curr_inn_index")) || 0;
    $scope.Target = parseInt(localStorage.getItem("target")) || 0;
    $scope.result = localStorage.getItem("final_result");
    $scope.resultgenerated = false;

    // ============================
    // Local Storage Sync
    // ============================
    function syncToLocalStorage() {
        localStorage.setItem("Runs", $scope.runs);
        localStorage.setItem("Wickets", $scope.wkt);
        localStorage.setItem("Balls", $scope.balls);
        localStorage.setItem("Whole_Overs", $scope.whole_overs);
        localStorage.setItem("FOURS", $scope.Fours);
        localStorage.setItem("SIX", $scope.Six);
        localStorage.setItem("Extras", $scope.EXTRAS);
        localStorage.setItem("CRR", $scope.crr);
        localStorage.setItem("OVERS", `${$scope.whole_overs}.${$scope.balls}`);
        localStorage.setItem("Curr_inn_index", $scope.i);
        localStorage.setItem("Current_inn_setup", JSON.stringify($scope.current_inn));
        localStorage.setItem("target", $scope.Target);
        localStorage.setItem("final_result", $scope.result);

        switch ($scope.current_inn[$scope.i]) {
            case "1st":
                $scope.Ist_inn_score = {
                    Runs: $scope.runs, WKT: $scope.wkt, Overs: $scope.Overs, RR: $scope.crr,
                    num_four: $scope.Fours, num_six: $scope.Six, Extras: $scope.EXTRAS
                };
                localStorage.setItem("Ist_inning_score", JSON.stringify($scope.Ist_inn_score));
                break;
            case "2nd":
                $scope.IInd_inn_score = {
                    Runs: $scope.runs, WKT: $scope.wkt, Overs: $scope.Overs, RR: $scope.crr,
                    num_four: $scope.Fours, num_six: $scope.Six, Extras: $scope.EXTRAS
                };
                localStorage.setItem("IInd_inning_score", JSON.stringify($scope.IInd_inn_score));
                break;
        }
    }

    // ============================
    // Setup innings order
    // ============================
    function setupInningsOrder() {
        if ($scope.Toss == $scope.Team_a) {
            if ($scope.elc == "Bat") {
                $scope.Ist_inn = $scope.Team_a;
                $scope.IInd_inn = $scope.Team_b;
            } else {
                $scope.Ist_inn = $scope.Team_b;
                $scope.IInd_inn = $scope.Team_a;
            }
        } else if ($scope.Toss == $scope.Team_b) {
            if ($scope.elc == "Bat") {
                $scope.Ist_inn = $scope.Team_b;
                $scope.IInd_inn = $scope.Team_a;
            } else {
                $scope.Ist_inn = $scope.Team_a;
                $scope.IInd_inn = $scope.Team_b;
            }
        }
    }
    setupInningsOrder();

    function updateCurrinn() {
        switch ($scope.current_inn[$scope.i]) {
            case "1st":
                $scope.Innings = $scope.Ist_inn;
                break;
            case "2nd":
                $scope.Innings = $scope.IInd_inn;
                break;
            default:
                alert("End of game!!!");
        }
    }
    updateCurrinn();

    // ============================
    // Next innings
    // ============================
    $scope.next_innings = function () {

        // code to reset for next innings...
        $scope.runs = 0;
        $scope.wkt = 0;
        $scope.whole_overs = 0;
        $scope.balls = 0;
        $scope.Overs = "0.0";
        $scope.Fours = 0;
        $scope.Six = 0;
        $scope.EXTRAS = 0;
        $scope.i++;
        $scope.crr = "--";
        updateCurrinn();
        CalTarget();
        syncToLocalStorage();
    };

    // Target Calculation
    function CalTarget() {
        if ($scope.i == 1) {
            $scope.Target = $scope.Ist_inn_score.Runs + 1;
            syncToLocalStorage();
        }
    }

    // Result Calculation
    function makeResult() {
        if ($scope.i == 1) {
            if ($scope.IInd_inn_score.Runs >= $scope.Target) {
                const wkt_remaining = $scope.max_wkt - $scope.IInd_inn_score.WKT;
                $scope.result = `${$scope.IInd_inn} won by ${wkt_remaining} wickets`;
                $scope.resultgenerated = true;
            } else if ($scope.IInd_inn_score.Runs == $scope.Target - 1 && ($scope.IInd_inn_score.Overs == $scope.maxovers || $scope.IInd_inn_score.WKT == $scope.max_wkt)) {
                $scope.result = "Match Tied";
                $scope.resultgenerated = true;
            } else if ($scope.IInd_inn_score.Runs < $scope.Target &&
                ($scope.IInd_inn_score.WKT == $scope.max_wkt || $scope.whole_overs == $scope.maxovers)) {
                const margin = ($scope.Target - 1) - $scope.IInd_inn_score.Runs;
                $scope.result = `${$scope.Ist_inn} won by ${margin} runs`;
                $scope.resultgenerated = true;
            }
        }
        syncToLocalStorage();
    }

    $scope.buttonLabel1st = function () {
        let lable = $scope.Ist_inn + ' 1st Innings - ' + $scope.Ist_inn_score.Runs;
        if (parseInt($scope.Ist_inn_score.WKT) != $scope.max_wkt) {
            lable += '/' + $scope.Ist_inn_score.WKT;
        }
        return lable;
    }
    $scope.buttonLabel2nd = function () {
        let lable = $scope.IInd_inn + ' 2nd Innings - ' + $scope.IInd_inn_score.Runs;
        if (parseInt($scope.IInd_inn_score.WKT) != $scope.max_wkt) {
            lable += '/' + $scope.IInd_inn_score.WKT;
        }
        return lable;
    }

    // Over & CRR
    $scope.over_ball_sim = function () {
        if ($scope.balls < 5) {
            $scope.balls++;
        } else {
            $scope.balls = 0;
            $scope.whole_overs++;
            if ($scope.batting_mode === "duoBat")
                $scope.swapStrikers();
        }
        $scope.Overs = `${$scope.whole_overs}.${$scope.balls}`;
        syncToLocalStorage();
    };

    $scope.cal_crr = function () {
        $scope.rr = $scope.runs / ($scope.whole_overs + ($scope.balls / 6));
        $scope.crr = isNaN($scope.rr) ? "--" : $scope.rr.toFixed(2);
        syncToLocalStorage();
        makeResult();
    };

    // Scoring Functions 
    $scope.dot = function () {
        if ($scope.wkt < $scope.max_wkt && $scope.Overs < $scope.maxovers && $scope.result == null) {
            $scope.runs += 0; $scope.over_ball_sim(); $scope.cal_crr();
            $scope.updatebattingscore($scope.Innings === $scope.Team_a ? 'A' : 'B', $scope.strikerId, 0);
            $scope.updatebowlingscore($scope.Innings === $scope.Team_a ? 'B' : 'A', $scope.bowlerId, 0, false);
            syncScoresToLocalStorage();
        } else {
            alert("End of the innings!!!");
        }
    };
    $scope.single = function () {
        if ($scope.wkt < $scope.max_wkt && $scope.Overs < $scope.maxovers && $scope.result == null) {
            $scope.runs += 1; $scope.over_ball_sim(); $scope.cal_crr();
            $scope.updatebattingscore($scope.Innings === $scope.Team_a ? 'A' : 'B', $scope.strikerId, 1); // Example playerId
            $scope.updatebowlingscore($scope.Innings === $scope.Team_a ? 'B' : 'A', $scope.bowlerId, 1, false); // Example bowlerId
            syncScoresToLocalStorage();
            if ($scope.batting_mode === "duoBat")
                $scope.swapStrikers();
        } else {
            alert("End of the innings!!!");
        }
    };
    $scope.double = function () {
        if ($scope.wkt < $scope.max_wkt && $scope.Overs < $scope.maxovers && $scope.result == null) {
            $scope.runs += 2; $scope.over_ball_sim(); $scope.cal_crr();
            $scope.updatebattingscore($scope.Innings === $scope.Team_a ? 'A' : 'B', $scope.strikerId, 2); // Example playerId
            $scope.updatebowlingscore($scope.Innings === $scope.Team_a ? 'B' : 'A', $scope.bowlerId, 2, false); // Example bowlerId
            syncScoresToLocalStorage();
        } else {
            alert("End of the innings!!!");
        }
    };
    $scope.triple = function () {
        if ($scope.wkt < $scope.max_wkt && $scope.Overs < $scope.maxovers && $scope.result == null) {
            $scope.runs += 3; $scope.over_ball_sim(); $scope.cal_crr();
            $scope.updatebattingscore($scope.Innings === $scope.Team_a ? 'A' : 'B', $scope.strikerId, 3); // Example playerId
            $scope.updatebowlingscore($scope.Innings === $scope.Team_a ? 'B' : 'A', $scope.bowlerId, 3, false); // Example bowlerId
            syncScoresToLocalStorage();
            if ($scope.batting_mode === "duoBat")
                $scope.swapStrikers();
        } else {
            alert("End of the innings!!!");
        }
    };
    $scope.four = function () {
        if ($scope.wkt < $scope.max_wkt && $scope.Overs < $scope.maxovers && $scope.result == null) {
            $scope.runs += 4; $scope.over_ball_sim(); $scope.cal_crr();
            $scope.updatebattingscore($scope.Innings === $scope.Team_a ? 'A' : 'B', $scope.strikerId, 4); // Example playerId
            $scope.updatebowlingscore($scope.Innings === $scope.Team_a ? 'B' : 'A', $scope.bowlerId, 4, false); // Example bowlerId
            syncScoresToLocalStorage();
        } else {
            alert("End of the innings!!!");
        }
    };
    $scope.five = function () {
        if ($scope.wkt < $scope.max_wkt && $scope.Overs < $scope.maxovers && $scope.result == null) {
            $scope.runs += 5; $scope.over_ball_sim(); $scope.cal_crr();
            $scope.updatebattingscore($scope.Innings === $scope.Team_a ? 'A' : 'B', $scope.strikerId, 5);
            $scope.updatebowlingscore($scope.Innings === $scope.Team_a ? 'B' : 'A', $scope.bowlerId, 5, false);
            syncScoresToLocalStorage();
            if ($scope.batting_mode === "duoBat")
                $scope.swapStrikers();
        } else {
            alert("End of the innings!!!");
        }
    };
    $scope.six = function () {
        if ($scope.wkt < $scope.max_wkt && $scope.Overs < $scope.maxovers && $scope.result == null) {
            $scope.runs += 6; $scope.over_ball_sim(); $scope.cal_crr();
            $scope.updatebattingscore($scope.Innings === $scope.Team_a ? 'A' : 'B', $scope.strikerId, 6); // Example playerId
            $scope.updatebowlingscore($scope.Innings === $scope.Team_a ? 'B' : 'A', $scope.bowlerId, 6, false); // Example bowlerId
            syncScoresToLocalStorage();
        } else {
            alert("End of the innings!!!");
        }
    };
    $scope.one_D = function () {
        if ($scope.wkt < $scope.max_wkt && $scope.Overs < $scope.maxovers && $scope.result == null) {
            $scope.runs += 1; $scope.over_ball_sim(); $scope.cal_crr();
            $scope.updatebattingscore($scope.Innings === $scope.Team_a ? 'A' : 'B', $scope.strikerId, 1); // Example playerId
            $scope.updatebowlingscore($scope.Innings === $scope.Team_a ? 'B' : 'A', $scope.bowlerId, 1, false);
            syncScoresToLocalStorage();
        }  else {
            alert("End of the innings!!!");
        }
    };
    $scope.two_D = function () {
        if ($scope.wkt < $scope.max_wkt && $scope.Overs < $scope.maxovers && $scope.result == null) {
            $scope.runs += 2; $scope.over_ball_sim(); $scope.cal_crr();
            $scope.updatebattingscore($scope.Innings === $scope.Team_a ? 'A' : 'B', $scope.strikerId, 2); // Example playerId
            $scope.updatebowlingscore($scope.Innings === $scope.Team_a ? 'B' : 'A', $scope.bowlerId, 2, false);
            syncScoresToLocalStorage();
        }   else {
            alert("End of the innings!!!");
        }
    };
    $scope.three_D = function () {
        if ($scope.wkt < $scope.max_wkt && $scope.Overs < $scope.maxovers && $scope.result == null) {
            $scope.runs += 3; $scope.over_ball_sim(); $scope.cal_crr();
            $scope.updatebattingscore($scope.Innings === $scope.Team_a ? 'A' : 'B', $scope.strikerId, 3); // Example playerId
            $scope.updatebowlingscore($scope.Innings === $scope.Team_a ? 'B' : 'A', $scope.bowlerId, 3, false);
            syncScoresToLocalStorage();
        }   else {  
            alert("End of the innings!!!");
        }
    };
    $scope.wicket = function () {
        if ($scope.wkt < $scope.max_wkt && $scope.Overs < $scope.maxovers && $scope.result == null) {
            $scope.wkt++;
            $scope.over_ball_sim();
            $scope.cal_crr();
            $scope.updatebowlingscore($scope.Innings === $scope.Team_a ? 'B' : 'A', $scope.bowlerId, 0, true); // Example bowlerId
            $scope.updatebattingscore($scope.Innings === $scope.Team_a ? 'A' : 'B', $scope.strikerId, 0, false, true); // Example playerId
            let battingscores = $scope.Innings === $scope.Team_a ? $scope.Team_a_battingscores : $scope.Team_b_battingscores;
            let player = battingscores.find(p => p.pid === $scope.strikerId);
            syncScoresToLocalStorage();
        } else {
            alert("End of the innings!!!");
        }
    };

    // Extras
    $scope.wide = function () {
        if ($scope.wkt < $scope.max_wkt && $scope.Overs < $scope.maxovers && $scope.result == null) {
            $scope.runs += $scope.extra + 1; $scope.EXTRAS += $scope.extra + 1; $scope.cal_crr();
            $scope.updatebowlingscore($scope.Innings === $scope.Team_a ? 'B' : 'A', $scope.bowlerId, $scope.extra + 1, false, true, $scope.extra + 1);
            syncScoresToLocalStorage();
             $scope.extra = 0;
        } else {
            alert("End of the innings!!!");
        }
    };
    $scope.no_ball = function () {
        if ($scope.wkt < $scope.max_wkt && $scope.Overs < $scope.maxovers && $scope.result == null) {
            $scope.runs += $scope.extra + 1; $scope.EXTRAS += 1; $scope.cal_crr(); $scope.extra = 0;
            $scope.updatebowlingscore($scope.Innings === $scope.Team_a ? 'B' : 'A', $scope.bowlerId, 1, false, 1); // Example bowlerId
            $scope.updatebattingscore($scope.Innings === $scope.Team_a ? 'A' : 'B', $scope.strikerId, $scope.extra,false); // Example playerId
            syncScoresToLocalStorage();
             $scope.extra = 0;
        } else {
            alert("End of the innings!!!");
        }
    };
    
    $scope.wicket_on_wide = function () {
        if ($scope.wkt < $scope.max_wkt && $scope.Overs < $scope.maxovers && $scope.result == null) {
            $scope.wkt++;
            $scope.runs += $scope.extra + 1; $scope.EXTRAS += $scope.extra + 1; $scope.cal_crr();
            $scope.updatebowlingscore($scope.Innings === $scope.Team_a ? 'B' : 'A', $scope.bowlerId, $scope.extra + 1, true, true, $scope.extra + 1);
            $scope.updatebattingscore($scope.Innings === $scope.Team_a ? 'A' : 'B', $scope.strikerId, 0, false, true); // Example playerId
            let battingscores = $scope.Innings === $scope.Team_a ? $scope.Team_a_battingscores : $scope.Team_b_battingscores;
            let player = battingscores.find(p => p.pid === $scope.strikerId);
            syncScoresToLocalStorage();
             $scope.extra = 0;
        } else {
            alert("End of the innings!!!");
        }
    };

    $scope.wicket_on_no_ball = function () {
        if ($scope.wkt < $scope.max_wkt && $scope.Overs < $scope.maxovers && $scope.result == null) {
            $scope.wkt++;
            $scope.runs += $scope.extra + 1; $scope.EXTRAS += 1; $scope.cal_crr(); 
            $scope.updatebattingscore($scope.Innings === $scope.Team_a ? 'A' : 'B', $scope.strikerId, $scope.extra, false, true); // Example playerId
            let battingscores = $scope.Innings === $scope.Team_a ? $scope.Team_a_battingscores : $scope.Team_b_battingscores;
            let player = battingscores.find(p => p.pid === $scope.strikerId);
            syncScoresToLocalStorage();
            $scope.extra = 0;
        }   else {
            alert("End of the innings!!!");
        }
    };

    $scope.runout_box = function () {
        if ($scope.wkt < $scope.max_wkt && $scope.Overs < $scope.maxovers && $scope.result == null) {
            $scope.wkt++;
            $scope.runs += $scope.extra; 
            $scope.over_ball_sim();
            $scope.cal_crr();
            $scope.updatebattingscore($scope.Innings === $scope.Team_a ? 'A' : 'B', $scope.strikerId, $scope.extra, false, true);
            $scope.updatebowlingscore($scope.Innings === $scope.Team_a ? 'B' : 'A', $scope.bowlerId, $scope.extra, false);
            let battingscores = $scope.Innings === $scope.Team_a ? $scope.Team_a_battingscores : $scope.Team_b_battingscores;
            let player = battingscores.find(p => p.pid === $scope.strikerId);
            syncScoresToLocalStorage();
             $scope.extra = 0;
        }   else {  
            alert("End of the innings!!!");
        }
    };
    $scope.Nb4plus = function () {
        if ($scope.wkt < $scope.max_wkt && $scope.Overs < $scope.maxovers && $scope.result == null) {
            $scope.runs = $scope.runs + 4 + 1;
            $scope.Fours++;
            $scope.EXTRAS = $scope.EXTRAS + 1;
            $scope.cal_crr();
            $scope.updatebattingscore($scope.Innings === $scope.Team_a ? 'A' : 'B', $scope.strikerId, 4, true); // Example playerId
            $scope.updatebowlingscore($scope.Innings === $scope.Team_a ? 'B' : 'A', $scope.bowlerId, 5, false, 1); // Example bowlerId
            syncScoresToLocalStorage();
        } else {
            alert("End of the innings!!!");
        }
    };
    $scope.Nb6plus = function () {
        if ($scope.wkt < $scope.max_wkt && $scope.Overs < $scope.maxovers && $scope.result == null) {
            $scope.runs = $scope.runs + 6 + 1;
            $scope.Six++;
            $scope.EXTRAS = $scope.EXTRAS + 1;
            $scope.cal_crr();
            $scope.updatebattingscore($scope.Innings === $scope.Team_a ? 'A' : 'B', $scope.strikerId, 6, true); // Example playerId
            $scope.updatebowlingscore($scope.Innings === $scope.Team_a ? 'B' : 'A', $scope.bowlerId, 7, false, 1); // Example bowlerId
            syncScoresToLocalStorage();
        } else {
            alert("End of the innings!!!");
        }
    };
    $scope.B_four = function () {
        if ($scope.wkt < $scope.max_wkt && $scope.Overs < $scope.maxovers && $scope.result == null) {
            $scope.Fours++; $scope.runs += 4; $scope.over_ball_sim(); $scope.cal_crr();
            $scope.updatebattingscore($scope.Innings === $scope.Team_a ? 'A' : 'B', $scope.strikerId, 4, true); // Example playerId
            $scope.updatebowlingscore($scope.Innings === $scope.Team_a ? 'B' : 'A', $scope.bowlerId, 4, false); // Example bowlerId
            syncScoresToLocalStorage();
        } else { alert("End of the innings!!!"); }
    };
    $scope.B_six = function () {
        if ($scope.wkt < $scope.max_wkt && $scope.Overs < $scope.maxovers && $scope.result == null) {
            $scope.Six++; $scope.runs += 6; $scope.over_ball_sim(); $scope.cal_crr();
            $scope.updatebattingscore($scope.Innings === $scope.Team_a ? 'A' : 'B', $scope.strikerId, 6, true); // Example playerId
            $scope.updatebowlingscore($scope.Innings === $scope.Team_a ? 'B' : 'A', $scope.bowlerId, 6, false); // Example bowlerId
            syncScoresToLocalStorage();
        } else { alert("End of the innings!!!"); }
    };
    $scope.penalty = function () {
        if ($scope.wkt < $scope.max_wkt && $scope.Overs < $scope.maxovers && $scope.result == null) { $scope.runs += 5; $scope.cal_crr(); } else { alert("End of the innings!!!"); };
    };


    // Selected player IDs
    $scope.strikerId = null;
    $scope.nonStrikerId = null;
    $scope.bowlerId = null;

    /**
     * Set the striker, non-striker, and bowler by player id.
     * Ensures striker and non-striker are from the batting team,
     * and bowler is from the bowling team.
     * @param {number} strikerId - Player id of the striker batsman
     * @param {number} nonStrikerId - Player id of the non-striker batsman
     * @param {number} bowlerId - Player id of the bowler
     */
    $scope.selectPlayersDuo = function (strikerId, nonStrikerId, bowlerId) {
        // Determine current batting and bowling teams
        let battingLineup, bowlingLineup;
        if ($scope.Innings === $scope.Team_a) {
            battingLineup = $scope.Team_a_lineups;
            bowlingLineup = $scope.Team_b_lineups;
        } else {
            battingLineup = $scope.Team_b_lineups;
            bowlingLineup = $scope.Team_a_lineups;
        }

        // Validate striker and non-striker from batting team
        const striker = battingLineup.find(p => p.id == strikerId);
        const nonStriker = battingLineup.find(p => p.id == nonStrikerId);
        // Validate bowler from bowling team
        const bowler = bowlingLineup.find(p => p.id == bowlerId);

        if (!striker) {
            alert("Invalid striker selected! Must be from batting team.");
            return;
        }
        if (!nonStriker) {
            alert("Invalid non-striker selected! Must be from batting team.");
            return;
        }
        if (!bowler) {
            alert("Invalid bowler selected! Must be from bowling team.");
            return;
        }
        if (strikerId == nonStrikerId) {
            alert("Striker and non-striker cannot be the same player!");
            return;
        }

        $scope.strikerId = strikerId;
        $scope.nonStrikerId = nonStrikerId;
        $scope.bowlerId = bowlerId;

        $scope.updateBattingStatus($scope.Innings === $scope.Team_a ? 'A' : 'B',$scope.strikerId, true);
        $scope.updateBattingStatus($scope.Innings === $scope.Team_a ? 'A' : 'B',$scope.nonStrikerId, true);
        $scope.updateBowlingStatus($scope.Innings === $scope.Team_a ? 'B' : 'A',$scope.bowlerId, true);
        syncScoresToLocalStorage();
    };

    $scope.selectPlayersSolo = function (strikerId, bowlerId) {
        // Determine current batting and bowling teams
        let battingLineup, bowlingLineup;
        if ($scope.Innings === $scope.Team_a) {
            battingLineup = $scope.Team_a_lineups;
            bowlingLineup = $scope.Team_b_lineups;
        } else {
            battingLineup = $scope.Team_b_lineups;
            bowlingLineup = $scope.Team_a_lineups;
        }

        // Validate striker and non-striker from batting team
        const striker = battingLineup.find(p => p.id == strikerId);
        // Validate bowler from bowling team
        const bowler = bowlingLineup.find(p => p.id == bowlerId);

        if (!striker) {
            alert("Invalid striker selected! Must be from batting team.");
            return;
        }
        if (!bowler) {
            alert("Invalid bowler selected! Must be from bowling team.");
            return;
        }
        $scope.strikerId = strikerId;
        $scope.bowlerId = bowlerId;

        $scope.updateBattingStatus($scope.Innings === $scope.Team_a ? 'A' : 'B',$scope.strikerId, true);
        $scope.updateBowlingStatus($scope.Innings === $scope.Team_a ? 'B' : 'A',$scope.bowlerId, true);
        syncScoresToLocalStorage();
    };

    // Example: Call selectPlayers at the start of an innings or when you want to set/change striker/non-striker/bowler
    $scope.setInitialPlayers = function () {
        // Example: select first two from batting lineup and first from bowling lineup
        let battingLineup, bowlingLineup;
        if ($scope.Innings === $scope.Team_a) {
            battingLineup = $scope.Team_a_lineups;
            bowlingLineup = $scope.Team_b_lineups;
        } else {
            battingLineup = $scope.Team_b_lineups;
            bowlingLineup = $scope.Team_a_lineups;
        }
        if ($scope.batting_mode === "duoBat") {
            if (battingLineup.length >= 2 && bowlingLineup.length >= 1) {
                $scope.selectPlayersDuo(
                    battingLineup[0].id, // striker
                    battingLineup[1].id, // non-striker
                    bowlingLineup[0].id  // bowler
                );
            }
        } else {
            if (battingLineup.length >= 1 && bowlingLineup.length >= 1) {
                $scope.selectPlayersSolo(
                    battingLineup[0].id, // striker
                    bowlingLineup[0].id  // bowler
                );
            }
        }
    };

    // Example: Call setInitialPlayers at the start of the match or innings
    $scope.setInitialPlayers();

    console.log("Team A:", $scope.Team_a_lineups, "Team B:", $scope.Team_b_lineups);

    // Sync batting and bowling scores to local storage
    function syncScoresToLocalStorage() {
        localStorage.setItem("Team_a_battingscores", JSON.stringify($scope.Team_a_battingscores));
        localStorage.setItem("Team_b_battingscores", JSON.stringify($scope.Team_b_battingscores));
        localStorage.setItem("Team_a_bowlingscores", JSON.stringify($scope.Team_a_bowlingscores));
        localStorage.setItem("Team_b_bowlingscores", JSON.stringify($scope.Team_b_bowlingscores));
        if ($scope.i === 0) { // 1st innings just finished
            if ($scope.Innings === $scope.Team_a) {
                $scope.Ist_inn_batting = angular.copy($scope.Team_a_battingscores);
                $scope.Ist_inn_bowling = angular.copy($scope.Team_b_bowlingscores);
            } else {
                $scope.Ist_inn_batting = angular.copy($scope.Team_b_battingscores);
                $scope.Ist_inn_bowling = angular.copy($scope.Team_a_bowlingscores);
            }
            localStorage.setItem("Ist_inn_batting", JSON.stringify($scope.Ist_inn_batting));
            localStorage.setItem("Ist_inn_bowling", JSON.stringify($scope.Ist_inn_bowling));
        }

        if ($scope.i === 1) { // 2nd innings just finished
            if ($scope.Innings === $scope.Team_a) {
                $scope.IInd_inn_batting = angular.copy($scope.Team_a_battingscores);
                $scope.IInd_inn_bowling = angular.copy($scope.Team_b_bowlingscores);
            } else {
                $scope.IInd_inn_batting = angular.copy($scope.Team_b_battingscores);
                $scope.IInd_inn_bowling = angular.copy($scope.Team_a_bowlingscores);
            }
            localStorage.setItem("IInd_inn_batting", JSON.stringify($scope.IInd_inn_batting));
            localStorage.setItem("IInd_inn_bowling", JSON.stringify($scope.IInd_inn_bowling));
        }
    }

    $scope.getBatsmanById = function (pid) {
        var arr = ($scope.Innings === $scope.Team_a) ? $scope.Team_a_battingscores : $scope.Team_b_battingscores;
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].pid == pid) return arr[i];
        }
        return null;
    };

    $scope.getBowlerById = function (pid) {
        // Bowling team is opposite of batting team
        var arr = ($scope.Innings === $scope.Team_a) ? $scope.Team_b_bowlingscores : $scope.Team_a_bowlingscores;
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].pid == pid) return arr[i];
        }
        return null;
    };
    // ...similarly, use $scope.strikerId and $scope.bowlerId in other scoring functions as needed...
});