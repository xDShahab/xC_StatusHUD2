ESX = nil
TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)

RegisterServerEvent("saveHungerThirst")
AddEventHandler("saveHungerThirst", function(hunger, thirst)
  local _source = source
  TriggerEvent('es:getPlayerFromId', _source, function(user)
		local player = user.getIdentifier()
		exports.ghmattimysql:execute("UPDATE users SET status=@status WHERE idSteam=@identifier", {['@identifier'] = player, ['@status'] = {['hunger']=hunger,['thirst']=thirst}})
	end)
end)

RegisterServerEvent("getPlayerStatus")
AddEventHandler("getPlayerStatus", function()
  local _source = source
  print(_source)
  TriggerEvent('es:getPlayerFromId', _source, function(user)
    local player = user.getIdentifier()
    exports.ghmattimysql:execute('SELECT status FROM users WHERE identifier = @identifier', {['@identifier'] = player}, function(result)
      if result[1].status then
        data = json.decode(result[1].status)
		TriggerClientEvent('PlayerStatus', _source, data)
	  else
		TriggerClientEvent('PlayerStatus', _source, {})
      end
    end)
  end)
end)

ESX.RegisterServerCallback('ReloadData', function(source, cb)
  local xPlayer = ESX.GetPlayerFromId(source)
  if xPlayer then
    cb(xPlayer)
  end
end)

ESX.RegisterServerCallback('xC_StatusHUD:avatar', function(source, cb)
  local identifier = GetPlayerIdentifiers(source)[1]
  cb(tonumber(identifier:gsub("steam:",""), 16))
end)